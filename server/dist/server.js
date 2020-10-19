"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_router_1 = __importDefault(require("./routes/products-router"));
const app = express_1.default();
// Routes
app.use("/api/products/", products_router_1.default);
app.listen(5000, () => {
    console.log(`The server is listening on port ${5000}!`);
});
