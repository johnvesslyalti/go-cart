import Cart from "../models/Cart.js";

const cartController = async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const userId = req.user?._id;

  if (!productId) {
    return res.status(400).json({ error: "Product ID is required" });
  }

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart); // ✅ use 200 here
  } catch (error) {
    console.error("Add to cart failed:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export default cartController;
