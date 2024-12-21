import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import connectDb from "./db";
import { UserModel } from "./models/user.model";
const app = express();

app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
    //? zod validation and hash the password 
  const { username, password } = req.body;

  const newUser = await UserModel.create({
    username: username,
    password: password,
  });

  res.status(200).json({ message: "Signed up successfully" });
});
app.delete("/api/v1/content", (req, res) => {});
app.post("/api/v1/brain/share", (req, res) => {});
app.get("/api/v1/brain/:shareLink", (req, res) => {});

app.listen(3000, () => {
  console.log("Server started");
  connectDb();
});
