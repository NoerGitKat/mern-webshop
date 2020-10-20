import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import productsRouter from "./routes/products-router";

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());

// Routes
app.use("/api/products/", productsRouter);

app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}!`);
});
