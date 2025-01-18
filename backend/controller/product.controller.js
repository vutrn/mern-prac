import mongoose from "mongoose";
import { Product } from "../models/product.model.js";

const getProduct = async (req, res) => {
  try {
    const getProducts = await Product.find({}); // fetch all the products from the database
    res.status(200).json({ success: true, data: getProducts });
  } catch (error) {
    console.log("Error in fetching products: ", error.message);
    res.status(500).json({ success: false, message: "SERVER ERROR" });
  }
};

const postProduct = async (req, res) => {
  const products = req.body; // user will send the products in the request body
  // console.log(req.body);
  if (!products.name || !products.price || !products.image) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }
  const newProduct = new Product(products);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log("Error in creating product: ", error.message);
    res.status(500).json({ success: false, message: `SERVER ERROR` });
  }
};

const putProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No product with id: ${id}`);
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product);
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.log("Error in updating product: ", error.message);
    res.status(500).json({ success: false, message: "SERVER ERROR" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  // console.log("id: ", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No product with id: ${id}`);
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in deleting product: ", error.message);
    res.status(500).json({ success: false, message: "SERVER ERROR" });
  }
};

export { getProduct, postProduct, putProduct, deleteProduct };
