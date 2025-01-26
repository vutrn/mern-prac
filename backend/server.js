import dotenv from "dotenv";
import express from "express";
import { db } from "./config/db.js";
import productRouter from "./routes/product.route.js";
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(express.json()); // to parse the incoming request with JSON payloads
app.use("/api/products", productRouter);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  })
}

app.listen(PORT, () => {
  db();
  console.log(`Server started on http://localhost:${PORT}`);
});
