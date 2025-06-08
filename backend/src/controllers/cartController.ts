import { Request as ExpressRequest, Response } from 'express';
import Product from "../models/Product";
import Cart, { ICart } from '../models/Cart';
import mongoose from 'mongoose';
import { IUser } from '../models/User';

interface AuthRequest extends ExpressRequest {
    user?: IUser; 
}

export const getCart = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
          res.status(401).json({ message: "Unauthorized" });
          return;
        }
        const userId = req.user._id;
        const cart = await Cart.findOne({ userId }).populate("items.productId");
        if(!cart) { 
            res.status(404).json({ message: "Cart not found"});
            return;
        }
        res.status(200).json(cart);
    } catch (error: any) {
        res.status(500).json({ message : error.message });
    }
}

export const addToCart = async (req: AuthRequest, res: Response): Promise<void> => {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { productId, quantity }: {productId: string; quantity: number} = req.body;
    try {
        const product = await Product.findById(productId);

        if(!product) {
            res.status(404).json({ message: "Product not found"});
            return;
        }

        let cart: ICart | null = await Cart.findOne({ userId: req.user._id });

        if(!cart) {
            cart = new Cart({
                userId: req.user._id,
                items: [{productId, quantity, price: product.price}]
            });
        } else {
            const objectId = new mongoose.Types.ObjectId(productId);
            const itemIndex = cart.items.findIndex(item => item.productId.equals(objectId));
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
