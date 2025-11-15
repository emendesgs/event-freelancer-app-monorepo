import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProducts = async (_req: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: true,
            },
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'Product ID is required' });
    }

    try {
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                category: true,
            },
        });
        if (product) {
            return res.status(200).json(product);
        } else {
            return res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching product', error });
    }
};