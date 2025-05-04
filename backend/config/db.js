import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log('mongodb is connected');
    } catch(error) {
        console.error(error);
    }
}

export default connectDB;