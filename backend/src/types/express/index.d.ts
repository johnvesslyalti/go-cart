// types/express/index.d.ts
import { IUser } from '../../models/User'; // Adjust based on your actual user model

declare global {
  namespace Express {
    interface Request {
      user?: any; // or whatever type you're using for req.user
    }
  }
}
