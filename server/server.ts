import express from "express";
import productsRouter from "./routes/products-router";

const app = express();

// Routes
app.use("/api/products/", productsRouter);

app.listen(5000, () => {
  console.log(`The server is listening on port ${5000}!`);
});
