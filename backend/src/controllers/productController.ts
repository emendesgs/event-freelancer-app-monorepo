import { Request, Response } from 'express';
import getDatabase from '../database/connection';

export const getProducts = async (_req: Request, res: Response) => {
    try {
        const db = await getDatabase();
        const products = await db.all(`
            SELECT 
                p.*,
                u.full_name as userName,
                c.name as categoryName
            FROM products p
            JOIN users u ON p.user_id = u.id
            JOIN categories c ON p.category_id = c.id
        `);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};