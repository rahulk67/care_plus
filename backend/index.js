import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connection from "./src/db/connection.js";
import userRoutes from "./src/routes/user.routes.js";
import { authMiddleware } from "./src/middleware/authMiddleware.js";

dotenv.config();


const app = express();
connection;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ["http://localhost:3000","https://care-plus-frontend-tau.vercel.app"],
    credentials: true
}));
app.use(express.static("public"));

app.use("/api/user",userRoutes);


app.get("/api/me",authMiddleware,(req,res)=>{
    res.status(200).json({message:"User found", user:req.user,success:true});
})

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(8000, () => console.log("Server started on port 8000"));
