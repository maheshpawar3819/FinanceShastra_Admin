import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { id } = req.body;
  const numId = Number(id);

  if (!numId) {
    return res.status(400).json({ error: "ID is required for deletion" });
  }

  try {
    const query = `DELETE FROM stocks_sector_weitage WHERE id = ?`;
    await pool.execute(query, [numId]);

    //sending response
    res.status(200).json({
      success: true,
      message: "Record deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Error deleting record", details: error });
  }
}
