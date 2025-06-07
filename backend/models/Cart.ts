import mongoose, {Document, Schema, Model} from 'mongoose';

interface CartItem {
    productId: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
}
const cartItemsSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
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
    }
})

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
    },
    items: [cartItemsSchema],
}, {timestamps: true});

export default mongoose.model("Cart", cartSchema);