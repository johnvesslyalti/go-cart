import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI as string);
        console.log("MongoDB is connected");
    } catch (error) {
        console.error("Error connection to mongoDB", error);
    }
}

export default connectDB;