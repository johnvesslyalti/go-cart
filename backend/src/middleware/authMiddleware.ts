import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User, { IUser } from '../models/User';

interface AuthRequest extends Request {
    user?: IUser;
}
export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    let token: string | undefined;

    try {
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

            if (!decoded || typeof decoded !== 'object' || !decoded.id) {
                res.status(401).json({ message: "Invalid token"});
                return;
            }

            const user = await User.findById(decoded.id).select("-password").lean<IUser>();
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            req.user = user;
            next();
        } else {
            res.status(401).json({ message: "Not authorized no token"})
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
    if(req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Admin only'})
    }
}