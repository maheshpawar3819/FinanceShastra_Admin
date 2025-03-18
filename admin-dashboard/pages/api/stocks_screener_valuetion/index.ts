import { NextApiRequest, NextApiResponse } from "next";
import connection from "@/utils/db";
import { StockScreenerValuation } from "@/types";
import { RowDataPacket } from "mysql2";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const [rows] = await connection.query<
        StockScreenerValuation[] & RowDataPacket[]
      >(`SELECT * FROM stocks_screnner_valuetion`);

      //sending response
      return res.status(200).json({
        message: "success",
        data: rows,
      });
    } catch (error) {
      console.error("Database Error: ", error);
      return res.status(500).json({ error: "Error fetching data" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
