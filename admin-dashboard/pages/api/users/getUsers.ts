import { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/utils/db';
import { RowDataPacket } from "mysql2";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const blogs = await pool.query<RowDataPacket[]>('SELECT * FROM user_details WHERE user_id IS NOT NULL');
        return res.status(200).json(blogs);
    } catch (error: any) {
        return res.status(500).json({ error: 'Error fetching blogs', details: error.message });
    }
}
