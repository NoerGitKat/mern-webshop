import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "colorts/lib/string";

dotenv.config();

import productsRouter from "./routes/products-router";
import connectDB from "./util/connect-db";
import { handleError, handleNotFound } from "./middlewares/handle-errors";

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());

// Routes
app.use("/api/products/", productsRouter);

// Error handling
app.use(handleNotFound);
// app.use(handleError);

app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}!`.yellow);
  connectDB();
});
