import 'dotenv/config'
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

  if(!username || !password){
     res.status(400).json({ message: "Please provide username and password" }); 
  }
  
    const getUser = await UserModel.findOne({
      username: username,
      password: password,
    });
    
    if(!getUser){
       res.status(404).json({ message: "User not found" }); 
    }
  
  
    if (getUser) {
      const token = jwt.sign({
        id: getUser._id
      }, "mostimportantjwtsecret" );
      console.log(token)
      res.status(200).json({ message: "signed in successfully", getUser , token: token});
    }
  
} catch (error) {
  res.status(500).json({ message: "Something went wrong in signin" });
}
});

app.delete("/api/v1/content", (req, res) => {});
app.post("/api/v1/brain/share", (req, res) => {});
app.get("/api/v1/brain/:shareLink", (req, res) => {});

app.listen(3000, () => {
  console.log("Server started");
  connectDb();
});
