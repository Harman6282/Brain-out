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
const config_1 = require("./config");
const auth_middleware_1 = require("./middlewares/auth.middleware");
const content_model_1 = require("./models/content.model");
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
        if (!username || !password) {
            res.status(400).json({ message: "Please provide username and password" });
        }
        const getUser = yield user_model_1.UserModel.findOne({
            username: username,
            password: password,
        });
        if (!getUser) {
            res.status(404).json({ message: "User not found" });
        }
        if (getUser) {
            const token = jsonwebtoken_1.default.sign({
                id: getUser._id,
            }, config_1.JWT_SECRET);
            console.log(token);
            res
                .status(200)
                .json({ message: "signed in successfully", getUser, token: token });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong in signin" });
    }
}));
app.get("/api/v1/content", auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const content = yield content_model_1.ContentModel.find({ userId: userId }).populate("userId", "username");
    res.json({ message: "Content fetched successfully", content });
}));
app.post("/api/v1/content", auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { link, type, title } = req.body;
    yield content_model_1.ContentModel.create({
        title,
        link,
        type,
        //@ts-ignore
        userId: req.userId,
        tags: [],
    });
    res.json({ message: "Content created successfully" });
}));
app.delete("/api/v1/content/:contentId", auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const { contentId } = req.params;
    try {
        console.log(userId);
        const content = yield content_model_1.ContentModel.findById(contentId);
        //@ts-ignore
        console.log(content.userId);
        if (!content) {
            res.status(400).json({ message: "Content not found" });
        }
        //@ts-ignore
        if (content.userId.toString() !== userId.toString()) {
            res
                .status(400)
                .json({ message: "You are not authorized to delete this content" });
        }
        yield content_model_1.ContentModel.findByIdAndDelete(contentId);
        yield content_model_1.ContentModel.findByIdAndDelete(contentId);
        res.json({ message: "Content deleted successfully" });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Something went wrong in deleting content" });
    }
}));
app.post("/api/v1/brain/share", (req, res) => { });
app.get("/api/v1/brain/:shareLink", (req, res) => { });
app.listen(3000, () => {
    console.log("Server started");
    (0, db_1.default)();
});
