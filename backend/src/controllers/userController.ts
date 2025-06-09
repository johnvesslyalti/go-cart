import { Request, Response } from "express";
import User from "../models/User";
import { Types } from "mongoose";
import jwt from 'jsonwebtoken';

const generateToken = (userId: string): string => {
    const secret = process.env.JWT_SECRET;
    if(!secret) throw new Error("JWT_SECRET not set in environment");

    return jwt.sign({ id: userId}, secret, {expiresIn: '7d'});
};

interface IUser {
    name: string;
    email: string;
    password: string;
}

export const register = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if(userExists) {
            res.status(400).json({ message: 'User exists please login.' });
            return;
        }

        const user = await User.create({
            name,
            email,
            password,
        }) as IUser;

        res.status(201).json({
            message: "Account created successfully"
        });

    } catch(error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if(!user){
            res.status(400).json({ error: 'Invalid credentials' });
            return;
        }

        const isMatch = await user.comparePassword(password);

        if(!isMatch) {
            res.status(400).json({ error: "Invalid credentials" });
            return;
        }

        const token = generateToken((user._id as Types.ObjectId).toString());
        
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token
        })

    } catch(error) {
        if(error instanceof Error) {
            res.status(500).json({ message: error.message})
        } else {
            res.status(500).json({ message: 'An unknown error occured' });
        }
    }
}

export const viewUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        if(error instanceof Error) {
            res.status(500).json({ message: error.message})
        } else {
            res.status(500).json({ message: 'An unknown error occured' });
        }
    }
}