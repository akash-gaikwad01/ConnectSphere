import mongoose from "mongoose";

// Function to connect with MongoDB database
export const connectDB = async () => {
    try {

        mongoose.connection.on("connected", () => {
            console.log("Database connected");
        });

        await mongoose.connect(`${process.env.MONGODB_URL}/chat_app`);

    } catch (error) {
        console.log("MongoDB connection error:", error);
    }
};

