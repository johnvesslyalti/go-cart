import mongoose from 'mongoose';

const cartItemsSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
})

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
    },
    items: [cartItemsSchema],
});

export default mongoose.model("Cart", cartSchema);