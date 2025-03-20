// pages/api/deleteBlog.ts
import { NextApiRequest, NextApiResponse } from 'next';
import pool from "@/utils/db";
import { ResultSetHeader } from "mysql2";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    const { id } = req.query;
    const { confirm_delete_blog } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'Blog ID is required' });
    }
    if (confirm_delete_blog !== '1') {
        return res.status(400).json({ error: 'Delete confirmation required' });
    }

    try {
        await pool.query<ResultSetHeader>('DELETE FROM blogs WHERE id = ?', [id]);
        return res.status(200).json({ message: 'Blog deleted successfully!' });
    } catch (error: any) {
        return res.status(500).json({ error: 'Error deleting blog', details: error.message });
    }
}
