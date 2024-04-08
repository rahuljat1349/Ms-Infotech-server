import  mongoose  from "mongoose";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI, {});
    console.log(`Connected to MongoDB on host: ${mongoose.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};
export default connectToDatabase;
