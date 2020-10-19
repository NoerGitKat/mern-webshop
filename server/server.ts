import express from "express";
import cors from "cors";

import productsRouter from "./routes/products-router";

const app = express();

// Middlewares
app.use(cors());

// Routes
app.use("/api/products/", productsRouter);

app.listen(5000, () => {
  console.log(`The server is listening on port ${5000}!`);
});
