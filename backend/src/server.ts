import express, { Express } from 'express';
import connectDB from './config/db';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import cartRoutes from './routes/cartRoutes'

dotenv.config();
connectDB()

const app: Express = express();

const allowedOrigins = [
    'https://go-cart-ebon.vercel.app/',
    'http://localhost:5173'  // Ensure no trailing slash
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // If using cookies or authentication headers
}));

app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

const PORT: number = parseInt(process.env.PORT || '5000', 10);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})
