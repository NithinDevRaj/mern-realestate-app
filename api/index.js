import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import error from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import path from "path";
dotenv.config();

const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(cookieParser());

//connecting to DB
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

//initialize server
app.listen(3000, () => {
  console.log("server is running");
});
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

//configuring error middleware
app.use(error);



