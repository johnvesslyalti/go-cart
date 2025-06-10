import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    category?: string;
    stock: number;
    image?: string;
    createdAt: Date;
}

const productSchema: Schema<IProduct> = new Schema<IProduct>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
        required: true, 
        min: 0,
    },
    category: {
        type: String,
        trim: true,
    },
    stock: {
        type: Number,
        min: 0,
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Product: Model<IProduct> = mongoose.model<IProduct>('Product', productSchema)
export default Product;