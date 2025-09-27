import mongoose from "mongoose";
import { MONGODB_URI } from "./index.js";

const mongodbConnection = async () =>
    await mongoose
        .connect(MONGODB_URI)
        .then(() => console.log("MongoDB Connected"))
        .catch((error) => console.log("Error connecting MongoDB", error));

export default mongodbConnection;
