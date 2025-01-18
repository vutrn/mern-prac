import express from "express";
import {
  deleteProduct,
  getProduct,
  postProduct,
  putProduct,
} from "../controller/product.controller.js";

const productRouter = express.Router();

productRouter.get("/", getProduct);
productRouter.post("/", postProduct);
productRouter.put("/:id", putProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;
