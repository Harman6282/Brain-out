
import mongoose from "mongoose";

async function connectDB() {
    
    const uri = "mongodb+srv://harmansingh:brainoutpassword@cluster0.mhl6s.mongodb.net/";
    try{
        await mongoose.connect(uri);
        console.log("Database connected successfully")
    }catch(err){
        console.log("Mongodb connection error" , err);
    }

}

export default connectDB;