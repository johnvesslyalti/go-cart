import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();
connectDB()

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/products', productRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server running at ${PORT}`);
})