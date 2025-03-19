import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { id } = req.query;
  if (!id) return res.status(400).json({ message: "Stock ID is required" });

  //id convert in the number
  const stockId = Number(id);

  try {
    if (req.method === "GET") {
      //fetch stock deta
      const [rows] = await pool.query(
        `SELECT * FROM stocks_screener_incomeStatement WHERE id = ?`,
        [stockId]
      );

      // Check if the stock exists
      if (!rows) {
        console.warn(`Stock with ID ${stockId} not found.`);
        return res.status(404).json({ message: "Stock not found" });
      }

      return res.status(200).json(rows);
    }

    if (req.method === "PUT") {
      //update stock data
      const {
        Symbol,
        Revenue,
        RevenueGrowth,
        GrossProfit,
        OperatingIncome,
        NetIncome,
        EBITDA,
        EPS_Diluted,
        EPSDilutedGrowth,
      } = req.body;

      await pool.query(
        `UPDATE stocks_screener_incomeStatement SET  Symbol,
        Revenue = ?,
        RevenueGrowth = ?,
        GrossProfit = ?,
        OperatingIncome = ?,
        NetIncome = ?,
        EBITDA = ?,
        EPS_Diluted = ?,
        EPSDilutedGrowth = ? WHERE id = ?`,
        [
          Symbol,
          Revenue,
          RevenueGrowth,
          GrossProfit,
          OperatingIncome,
          NetIncome,
          EBITDA,
          EPS_Diluted,
          EPSDilutedGrowth,
          stockId,
        ]
      );

      //sending response
      return res.status(200).json({ message: "Stock updated successfully!" });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
}
