"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
require("colorts/lib/string");
const connect_db_1 = __importDefault(require("./../util/connect-db"));
const User_1 = __importDefault(require("./../models/User"));
const Product_1 = __importDefault(require("./../models/Product"));
const Order_1 = __importDefault(require("./../models/Order"));
const users_1 = __importDefault(require("./users"));
const products_1 = __importDefault(require("./products"));
dotenv_1.default.config();
connect_db_1.default();
const importData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. Delete collections completely
        yield Order_1.default.deleteMany({});
        yield Product_1.default.deleteMany({});
        yield User_1.default.deleteMany({});
        // 2. Insert users
        const userDocs = yield User_1.default.insertMany(users_1.default);
        const adminUserId = userDocs[0]._id;
        // 3. Insert products
        const sampleProducts = products_1.default.map((product) => {
            return Object.assign(Object.assign({}, product), { user: adminUserId });
        });
        yield Product_1.default.insertMany(sampleProducts);
        console.log("Data imported!".green.underline);
        process.exit();
    }
    catch (error) {
        console.error(`Error in import! ${error}`.red.inverse);
        process.exit(1);
    }
});
const dropData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. Delete collections completely
        yield Order_1.default.deleteMany({});
        yield Product_1.default.deleteMany({});
        yield User_1.default.deleteMany({});
        console.log("Data dropped!".green.inverse);
        process.exit();
    }
    catch (error) {
        console.error(`Error in drop! ${error}`.red.inverse);
        process.exit(1);
    }
});
if (process.argv[2] === "-d") {
    dropData();
}
else {
    importData();
}
