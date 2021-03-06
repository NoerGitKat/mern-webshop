import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "colorts/lib/string";

dotenv.config();

import productsRouter from "./routes/products-router";
import connectDB from "./util/connect-db";
import { handleError, handleNotFound } from "./middlewares/handle-errors";
import usersRouter from "./routes/user-routes";
import ordersRouter from "./routes/orders-routes";
import { getPayPalConfig } from "./controllers/config-controller";
import uploadRouter from "./routes/upload-routes";
import path from "path";

const app: express.Express = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/uploads", uploadRouter);

// API Keys
app.use("/api/config/paypal", getPayPalConfig);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Error handling
app.use(handleNotFound);
app.use(handleError);

app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}!`.green.inverse);
  connectDB();
});
