// pages/api/news.ts
import { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/utils/db';
import { ResultSetHeader } from 'mysql2';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { title, content, image_url } = req.body;
        try {
            await pool.query<ResultSetHeader>('INSERT INTO news (title, content, image_url) VALUES (?, ?, ?)', [title, content, image_url]);
            return res.status(201).json({ message: 'News created successfully!' });
        } catch (error: any) {
            return res.status(500).json({ error: 'Error creating news', details: error.message });
        }
    }
    
    else if (req.method === 'PUT') {
        const { id, title, content, image_url } = req.body;
        if (!id) {
            return res.status(400).json({ error: 'News ID is required' });
        }
        try {
            await pool.query<ResultSetHeader>('UPDATE news SET title = ?, content = ?, image_url = ? WHERE id = ?', [title, content, image_url, id]);
            return res.status(200).json({ message: 'News updated successfully!' });
        } catch (error: any) {
            return res.status(500).json({ error: 'Error updating news', details: error.message });
        }
    }
    
    else if (req.method === 'DELETE') {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ error: 'News ID is required' });
        }
        try {
            await pool.query<ResultSetHeader>('DELETE FROM news WHERE id = ?', [id]);
            return res.status(200).json({ message: 'News deleted successfully!' });
        } catch (error: any) {
            return res.status(500).json({ error: 'Error deleting news', details: error.message });
        }
    }
    
    else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}
