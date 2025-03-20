import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/utils/db";
import { ResultSetHeader } from "mysql2";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    if (req.method !== 'PUT') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    const { id } = req.query;
    const { title, content } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'Blog ID is required' });
    }
    try {
        await pool.query<ResultSetHeader>('UPDATE blogs SET title = ?, content = ? WHERE id = ?', [title, content, id]);
        return res.status(200).json({ message: 'Blog updated successfully!' });
    } catch (error: any) {
        return res.status(500).json({ error: 'Error updating blog', details: error.message });
    }
}