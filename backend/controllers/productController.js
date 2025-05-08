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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;

    try {
        const products = await Product.find()
        .skip(startIndex)
        .limit(limit);

        const total = await Product.countDocuments();

        res.json({
            products,
            currentPage: page,
            totalPages: Math.ceil(total/limit),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const deleteProduct = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'product deleted successfully'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const editProduct = async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}