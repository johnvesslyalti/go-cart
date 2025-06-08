import mongoose, { Document, Schema, Model } from 'mongoose';

interface ICartItem {
    productId: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
}

export interface ICart extends Document {
    userId: mongoose.Types.ObjectId;
    items: ICartItem[];
    createdAt: Date;
    updatedAt: Date;
}

const cartItemsSchema = new Schema<ICartItem>({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
        min: 1,
    },
    price: {
        type: Number,
        required: true,
    },
});

const cartSchema = new Schema<ICart>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        required: true,
    },
    items: [cartItemsSchema],
}, { timestamps: true});

const Cart: Model<ICart> = mongoose.model<ICart>('Cart', cartSchema);
export default Cart;