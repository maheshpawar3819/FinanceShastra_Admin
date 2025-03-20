import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { id } = req.query;
  if (!id) return res.status(400).json({ message: "Stock ID is required" });

  const stockId = Number(id);
  if (isNaN(stockId)) {
    return res.status(400).json({ message: "Invalid Stock ID" });
  }

  try {
    if (req.method === "GET") {
      // Fetch stock data by ID
      const [rows]: any = await pool.query(
        "SELECT * FROM stocks_screnner_data WHERE id = ?",
        [stockId]
      );

      // Check if the stock exists
      if (rows.length === 0) {
        console.warn(`Stock with ID ${stockId} not found.`);
        return res.status(404).json({ message: "Stock not found" });
      }

      //sending response
      return res.status(200).json(rows[0]);
    }

    if (req.method === "PUT") {
      const {
        CompanyName,
        LastTradedPrice,
        ChangePercentage,
        MarketCap,
        High52W,
        Low52W,
        Sector,
        CurrentPE,
        IndexName,
        RecordDate,
        ROE,
        PBV,
        EV_EBITDA,
        FiveYearSalesGrowth,
        FiveYearProfitGrowth,
        Volume,
        EPS,
        EPSGrowth,
        DividendYield,
        DividendAmount,
        ROCE,
      } = req.body;

      const query = `
        UPDATE stocks_screnner_data 
        SET CompanyName = ?, LastTradedPrice = ?, ChangePercentage = ?, 
            MarketCap = ?, High52W = ?, Low52W = ?, Sector = ?, 
            CurrentPE = ?, IndexName = ?, RecordDate = ?, ROE = ?, PBV = ?, 
            EV_EBITDA = ?, FiveYearSalesGrowth = ?, FiveYearProfitGrowth = ?, 
            Volume = ?, EPS = ?, EPSGrowth = ?, DividendYield = ?, 
            DividendAmount = ?, ROCE = ?
        WHERE id = ?
      `;

      const values = [
        CompanyName,
        LastTradedPrice,
        ChangePercentage,
        MarketCap,
        High52W,
        Low52W,
        Sector,
        CurrentPE,
        IndexName,
        RecordDate,
        ROE,
        PBV,
        EV_EBITDA,
        FiveYearSalesGrowth,
        FiveYearProfitGrowth,
        Volume,
        EPS,
        EPSGrowth,
        DividendYield,
        DividendAmount,
        ROCE,
        stockId,
      ];

      const [result]: any = await pool.execute(query, values);

      //send response and handle errors
      if (result.affectedRows > 0) {
        return res
          .status(200)
          .json({ success: true, message: "Stock updated successfully!" });
      } else {
        return res.status(404).json({
          success: false,
          message: "Stock not found or no changes made.",
        });
      }
    } else {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
}
