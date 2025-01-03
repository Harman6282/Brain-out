"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const authMiddleware = (req, res, next) => {
    console.log();
    const header = req.headers.authorization;
    const decoded = jsonwebtoken_1.default.verify(header, config_1.JWT_SECRET);
    if (decoded) {
        //@ts-ignore
        req.userId = decoded.id;
        next();
    }
    else {
        res.status(401).json({ message: "You are not logged in" });
    }
};
exports.authMiddleware = authMiddleware;
