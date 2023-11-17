import mongoose from 'mongoose';

async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/social-media");
    console.log("Connected to MongoDB");
  } catch {
    console.log("Error connecting to MongoDB");
  }
}
export default { connect };