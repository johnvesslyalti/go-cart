import Cart from "../models/Cart.js"
import Product from "../models/Product.js";

export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user._id}).populate("items.productId");
        if(!cart) return res.status(404).json({ message: "Cart not found"});
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message : error.message })
    }
}

export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const product = await Product.findById(productId);
        if(!product) return res.status(404).json({ message: "Product not found"});

        let cart = await Cart.findOne({ userId: req.user.id });

        if(!cart) {
            cart = new Cart({
                userId: req.user.id,
                items: [{productId, quantity, price: product.price}]
            })
        } else {
            const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
            if(itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ productId, quantity, price: product.price});
            }
        }

        await cart.save();
        res.status(200).json(cart);
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}