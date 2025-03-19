import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/utils/db";
import { ResultSetHeader } from "mysql2";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") {
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

    console.log(req.body);

    try {
      const query = `INSERT INTO stocks_screener_incomeStatement (Symbol,
      Revenue ,
      RevenueGrowth,
      GrossProfit,
      OperatingIncome,
      NetIncome,
      EBITDA,
      EPS_Diluted,
      EPSDilutedGrowth) VALUES (?,?,?,?,?,?,?,?,?)`;

      const values = [
        Symbol,
        Revenue,
        RevenueGrowth,
        GrossProfit,
        OperatingIncome,
        NetIncome,
        EBITDA,
        EPS_Diluted,
        EPSDilutedGrowth,
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
