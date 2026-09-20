import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


mongoose.connect(process.env.MONGODB_URI);

export const connection = mongoose.connection;
connection.on("connected", () => {
    console.log("MongoDB connected");
});
connection.on("error", (error) => {
    console.log(error);
});
connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
});
export default connection;