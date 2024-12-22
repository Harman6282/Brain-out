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
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("./db"));
const user_model_1 = require("./models/user.model");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //? zod validation and hash the password
    const { username, password } = req.body;
    try {
        const newUser = yield user_model_1.UserModel.create({
            username: username,
            password: password,
        });
        res
            .status(200)
            .json({ message: "Signed up successfully", newUser: newUser });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //? zod validation 
    const { username, password } = req.body;
    try {
        const getUser = yield user_model_1.UserModel.findOne({
            username: username,
            password: password,
        });
        if (getUser) {
            const token = jsonwebtoken_1.default.sign({
                id: getUser._id
            }, "mostimportantjwtsecret");
            console.log(token);
            res.status(200).json({ message: "signed in successfully", getUser, token: token });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong in signin" });
    }
}));
app.delete("/api/v1/content", (req, res) => { });
app.post("/api/v1/brain/share", (req, res) => { });
app.get("/api/v1/brain/:shareLink", (req, res) => { });
app.listen(3000, () => {
    console.log("Server started");
    (0, db_1.default)();
});
