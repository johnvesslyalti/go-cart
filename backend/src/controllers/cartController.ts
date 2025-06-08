import { Request, Response } from 'express';
import Product from "../models/Product";
import Cart, { ICart } from '../models/Cart';
import mongoose from 'mongoose';

export const getCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id;
        // req.user is now known, but optional, so assert or check it
        if (!req.user) {
          res.status(401).json({ message: "Unauthorized" });
          return;
        }

        const cart = await Cart.findOne({ userId: req.user._id }).populate("items.productId");
        if(!cart) { 
            res.status(404).json({ message: "Cart not found"});
            return;
        }
        res.status(200).json(cart);
    } catch (error: any) {
        res.status(500).json({ message : error.message });
    }
}

export const addToCart = async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { productId, quantity }: {productId: string; quantity: number} = req.body;
    try {
        const product = await Product.findById(productId);

        const objectId = new mongoose.Types.ObjectId(productId);

        if(!product) {
            res.status(404).json({ message: "Product not found"});
            return;
        }

        let cart: ICart | null = await Cart.findOne({ userId: req.user.id });

        if(!cart) {
            cart = new Cart({
                userId: req.user.id,
                items: [{productId, quantity, price: product.price}]
            });
        } else {
            const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
            if(itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ productId: objectId, quantity, price: product.price});
            }
        }

        await cart.save();
        res.status(200).json(cart);
    } catch(error: any) {
        res.status(500).json({ message: error.message });
    }
}
