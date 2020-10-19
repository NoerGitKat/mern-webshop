"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = void 0;
const getProducts = (req, res) => {
    res.send(JSON.stringify([{ name: "noer" }]));
};
exports.getProducts = getProducts;
