
import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/utils/db";
import { RowDataPacket } from "mysql2";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Blog ID is required' });
    }

    try {
        const [blog] = await pool.query<RowDataPacket[]>('SELECT * FROM blogs WHERE id = ?', [id]);
        if (!blog.length) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        return res.status(200).json(blog[0]);
    } catch (error: any) {
        return res.status(500).json({ error: 'Error fetching blog', details: error.message });
    }
}
