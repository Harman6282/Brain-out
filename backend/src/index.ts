import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import connectDb from "./db";
import { UserModel } from "./models/user.model";
import { JWT_SECRET } from "./config";
import { authMiddleware } from "./middlewares/auth.middleware";
import { ContentModel } from "./models/content.model";
const app = express();
app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
  //? zod validation and hash the password
  const { username, password } = req.body;

  try {
    const newUser = await UserModel.create({
      username: username,
      password: password,
    });

    res
      .status(200)
      .json({ message: "Signed up successfully", newUser: newUser });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  //? zod validation
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      res.status(400).json({ message: "Please provide username and password" });
    }

    const getUser = await UserModel.findOne({
      username: username,
      password: password,
    });

    if (!getUser) {
      res.status(404).json({ message: "User not found" });
    }

    if (getUser) {
      const token = jwt.sign(
        {
          id: getUser._id,
        },
        JWT_SECRET
      );
      console.log(token);
      res
        .status(200)
        .json({ message: "signed in successfully", getUser, token: token });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong in signin" });
  }
});

app.get("/api/v1/content", authMiddleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId;
  const content = await ContentModel.find({ userId: userId }).populate(
    "userId",
    "username"
  );

  res.json({ message: "Content fetched successfully", content });
});

app.post("/api/v1/content", authMiddleware, async (req, res) => {
  const { link, type, title } = req.body;

  await ContentModel.create({
    title,
    link,
    type,
    //@ts-ignore
    userId: req.userId,
    tags: [],
  });

  res.json({ message: "Content created successfully" });
});

app.delete("/api/v1/content/:contentId", authMiddleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId;
  const { contentId } = req.params;
  try {
    console.log(userId);

    const content = await ContentModel.findById(contentId);
    if (!content) {
      res.status(400).json({ message: "Content not found" });
    }
    //@ts-ignore
    if (content.userId.toString() !== userId.toString()) {
      res
        .status(400)
        .json({ message: "You are not authorized to delete this content" });
    }

    await ContentModel.findByIdAndDelete(contentId);

    await ContentModel.findByIdAndDelete(contentId);
    res.json({ message: "Content deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong in deleting content" });
  }
});

app.post("/api/v1/brain/share", (req, res) => {});
app.get("/api/v1/brain/:shareLink", (req, res) => {});

app.listen(3000, () => {
  console.log("Server started");
  connectDb();
});
