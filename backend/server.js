import dotenv from "dotenv";
import express from "express";
import { db } from "./config/db.js";
import productRouter from "./routes/product.route.js";

dotenv.config();
const app = express();

app.use(express.json()); // to parse the incoming request with JSON payloads
app.use("/api/products", productRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  db();
  console.log(`Server started on http://localhost:${PORT}`);
});
