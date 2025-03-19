import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const [rows] = await pool.query(
        `SELECT * FROM stocks_screener_incomeStatement`
      );

      //sending response
      return res.status(200).json({
        success: true,
        message: "success",
        data: rows,
      });
    } catch (error) {
      console.error("Database Error: ", error);
      return res.status(405).json({ error: "Method Not Allowed" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
