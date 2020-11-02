"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPayPalConfig = void 0;
const getPayPalConfig = (req, res) => {
    return res.status(200).json(process.env.PAYPAL_CLIENT_ID);
};
exports.getPayPalConfig = getPayPalConfig;
