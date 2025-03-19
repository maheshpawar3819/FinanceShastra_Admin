import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/utils/db";

export default async function deleteStock(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { id } = req.body;

  if (!Symbol) {
    return res.status(400).json({ error: "ID is required for deletion" });
  }

  try {
    const query = `DELETE FROM stocks_screnner_valuetion WHERE id = ?`;
    await pool.query(query, [id]);

    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting record", details: error });
  }
}
