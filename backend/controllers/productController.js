import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
    const {
        name,
        description,
        price,
        category,
        stock,
        image,
    } = req.body;

    try{
        const product = await Product.create({
          name,
          description,
          price,
          category,
          stock,
          image  
        });

        res.status(201).json(product);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}