"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error500 = exports.error404 = void 0;
const error404 = (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    err.statusCode = 404;
    next(err);
};
exports.error404 = error404;
const error500 = (err, req, res, next) => {
    err.status = err.status || "error";
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
};
exports.error500 = error500;
