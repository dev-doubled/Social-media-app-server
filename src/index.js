import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import route from "./routers/index.js";
import db from "./config/db/index.js";
const app = express();
const PORT = process.env.PORT || 5000;

//Config dotenv
dotenv.config();

//CORS
app.use(cors());

//Connect to DB
await db.connect();

//HTTP logger
// app.use(morgan("combined"));

//Body parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
//Route
route(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
