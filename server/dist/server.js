"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
require("colorts/lib/string");
dotenv_1.default.config();
const products_router_1 = __importDefault(require("./routes/products-router"));
const connect_db_1 = __importDefault(require("./util/connect-db"));
const handle_errors_1 = require("./middlewares/handle-errors");
const app = express_1.default();
const PORT = process.env.PORT || 5000;
// Middlewares
app.use(cors_1.default());
// Routes
app.use("/api/products/", products_router_1.default);
// Error handling
app.use(handle_errors_1.handleNotFound);
// app.use(handleError);
app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}!`.yellow);
    connect_db_1.default();
});
