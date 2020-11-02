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
const user_routes_1 = __importDefault(require("./routes/user-routes"));
const orders_routes_1 = __importDefault(require("./routes/orders-routes"));
const config_controller_1 = require("./controllers/config-controller");
const app = express_1.default();
const PORT = process.env.PORT || 5000;
// Middlewares
app.use(cors_1.default());
app.use(express_1.default.json());
// Routes
app.use("/api/products", products_router_1.default);
app.use("/api/users", user_routes_1.default);
app.use("/api/orders", orders_routes_1.default);
// API Keys
app.use("/api/config/paypal", config_controller_1.getPayPalConfig);
// Error handling
app.use(handle_errors_1.handleNotFound);
app.use(handle_errors_1.handleError);
app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}!`.green.inverse);
    connect_db_1.default();
});
