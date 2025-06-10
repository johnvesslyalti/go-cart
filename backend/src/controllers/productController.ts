import { Request, Response } from "express";
import Product, { IProduct } from "../models/Product";

interface ProductBody {
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    image: string;
}

export const createProduct = async (req: Request<{}, {}, ProductBody >, res: Response): Promise<void> => {
    const {
        name,
        description,
        price,
        category,
        stock,
        image,
    } = req.body;

    try{
        const product = await Product.create({
          name,
          description,
          price,
          category,
          stock,
          image  
        });

        res.status(201).json(product);

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const [products, total] = await Promise.all([
            Product.find().skip(skip).limit(limit),
            Product.countDocuments(),
        ])

        res.json({
            currentPage: page,
            totalPage: Math.ceil(total/limit),
            totalProducts: total,
            products
        })

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const getProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const product: IProduct | null = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const deleteProduct = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'product deleted successfully'});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const editProduct = async (req: Request, res: Response) => {
    try {
        const updated: IProduct | null = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        res.json(updated);
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}