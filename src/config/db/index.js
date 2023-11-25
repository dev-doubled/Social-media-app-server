import mongoose from "mongoose";

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://devdd:VCRGhICqxRAeHjUE@social-media-app.uixqvro.mongodb.net/social-media?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to MongoDB");
  } catch {
    console.log("Error connecting to MongoDB");
  }
}
export default { connect };
