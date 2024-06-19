import mongoose from "mongoose";

const connectDB = async () => {
  const connectionURL =
  "mongodb+srv://ankitverma2k6:7t0lfzk6gO4NbdnP@cluster0.imb1la1.mongodb.net/";

  try {
    await mongoose.connect(connectionURL);
    console.log("blog DB connected");
  } catch (error) {
    console.log("Database not connected. Error is:", error);
  }
};

export default connectDB;