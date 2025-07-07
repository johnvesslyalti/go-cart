import { Request, Response } from "express";
import Product, { IProduct } from "../models/Product";
import fs from "fs";
import cloudinary from "../utils/cloudinary";

// Define the expected body structure
interface ProductBody {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
}

// Helper to extract public_id from Cloudinary URL
const getPublicId = (url: string): string => {
  const parts = url.split("/");
  const fileWithExtension = parts[parts.length - 1];
  const folder = parts[parts.length - 2];
  const publicId = `${folder}/${fileWithExtension.split(".")[0]}`;
  return publicId;
};

// ✅ Create Product with Cloudinary Image Upload
export const createProduct = async (
  req: Request<{}, {}, ProductBody> & { file?: Express.Multer.File },
  res: Response
): Promise<void> => {
  try {
    const { name, description, price, category, stock } = req.body;
    const localPath = req.file?.path;

    if (!localPath) {
      res.status(400).json({ message: "Image upload failed" });
      return;
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(localPath);

    // Safe local cleanup
    try {
      fs.unlinkSync(localPath);
    } catch {
      console.warn("Local file not found to delete:", localPath);
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      image: result.secure_url,
    });

    res.status(201).json(product);
  } catch (error: any) {
    console.error("Create Product Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get All Products with Pagination
export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find().skip(skip).limit(limit),
      Product.countDocuments(),
    ]);

    res.json({
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
      products,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Single Product by ID
export const getProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product: IProduct | null = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json(product);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete Product by ID (with Cloudinary image deletion)
export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    // ✅ Check if image exists before destroying
    if (product.image) {
      const publicId = getPublicId(product.image);
      await cloudinary.uploader.destroy(publicId);
    }

    await product.deleteOne();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error: any) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Product by ID (does not handle image update yet)
export const editProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updated: IProduct | null = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json(updated);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
