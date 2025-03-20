import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/utils/db";
import { ResultSetHeader } from "mysql2";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") {
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
    console.log(req.body);

    try {
      const query = `
      INSERT INTO stocks_screnner_data (
        CompanyName, LastTradedPrice, ChangePercentage, MarketCap, High52W, Low52W, 
        Sector, CurrentPE, IndexName, RecordDate, ROE, PBV, EV_EBITDA, 
        FiveYearSalesGrowth, FiveYearProfitGrowth, Volume, EPS, EPSGrowth, 
        DividendYield, DividendAmount, ROCE
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      ];

      const [result] = await pool.execute<ResultSetHeader>(query, values);

      if (result.affectedRows > 0) {
        res.status(200).json({
          success: true,
          message: "Stock added successfully!",
          id: result.insertId,
        });
      } else {
        res
          .status(400)
          .json({ success: false, message: "Failed to insert record." });
      }
    } catch (error) {
      res.status(500).json({ error: "Error adding record" });
    }
  }
}
