import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      Symbol,
      MarketCap,
      MarketCapPercentage,
      PERatio,
      PSRatio,
      PBRatio,
      PFCFRatio,
      Price,
      EnterpriseValue,
      EVRevenue,
      EVEBIT,
      EVEBITDA,
    } = req.body;

    try {
      const query = `
        INSERT INTO stocks_screnner_valuetion
        (Symbol, MarketCap, MarketCapPercentage, PERatio, PSRatio, PBRatio, PFCFRatio,
        Price, EnterpriseValue, EVRevenue, EVEBIT, EVEBITDA)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      await pool.query(query, [
        Symbol,
        MarketCap,
        MarketCapPercentage,
        PERatio,
        PSRatio,
        PBRatio,
        PFCFRatio,
        Price,
        EnterpriseValue,
        EVRevenue,
        EVEBIT,
        EVEBITDA,
      ]);

      //sending response
      res.status(200).json({ message: "Record added successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error adding record" });
    }
  }
}
