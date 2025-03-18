import { NextApiRequest, NextApiResponse } from "next";
import connection from "@/utils/db";

export default async function updateStock(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

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

  if (!Symbol) {
    return res.status(400).json({ error: "Symbol is required for updating" });
  }

  try {
    const query = `
      UPDATE stocks_screnner_valuetion 
      SET MarketCap = ?, MarketCapPercentage = ?, PERatio = ?, PSRatio = ?, PBRatio = ?, 
          PFCFRatio = ?, Price = ?, EnterpriseValue = ?, EVRevenue = ?, EVEBIT = ?, EVEBITDA = ?
      WHERE Symbol = ?
    `;

    await connection.query(query, [
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
      Symbol, 
    ]);

    res.status(200).json({ message: "Record updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating record", details: error });
  }
}
