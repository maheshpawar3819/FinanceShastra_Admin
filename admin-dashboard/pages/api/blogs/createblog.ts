import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/utils/db";
import { ResultSetHeader } from "mysql2";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") {
    const { title, content } = req.body;

    console.log(req.body);

    try {
      const query = `INSERT INTO blogs (title, content) VALUES (?, ?)`;
      const values = [title, content];

      const [result] = await pool.execute<ResultSetHeader>(query, values);

      if (result.affectedRows > 0) {
        res.status(200).json({
          success: true,
          message: "Blog created successfully!",
          id: result.insertId,
        });
      } else {
        res.status(400).json({ success: false, message: "Failed to create blog." });
      }
    } catch (error) {
      res.status(500).json({ error: "Error creating blog" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
