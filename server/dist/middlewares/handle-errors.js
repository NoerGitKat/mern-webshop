"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.handleNotFound = void 0;
const handleNotFound = (req, res, next) => {
    const error = new Error(`URL not found - ${req.originalUrl}`);
    return res.status(404).json({ msg: error.message });
    // next();
};
exports.handleNotFound = handleNotFound;
const handleError = (err, _req, res) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    const errMessage = {
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    };
    return res.status(statusCode).json(errMessage);
};
exports.handleError = handleError;
