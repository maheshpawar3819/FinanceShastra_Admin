import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/utils/db";
import { ResultSetHeader } from "mysql2";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") {
    const { Sector, NumberOfCompanies, Weightage, MarketCap } = req.body;

    try {
      const query = `INSERT INTO stocks_sector_weitage (Sector, NumberOfCompanies, Weightage, MarketCap) VALUES (?,?,?,?)`;

      const values = [
        Sector || null,
        NumberOfCompanies || null,
        Weightage || null,
        MarketCap || null,
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
