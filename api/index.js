import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import error from "./middlewares/error.middleware.js";
dotenv.config();
const app = express();

app.use(express.json());

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

//configuring error middleware
app.use(error);
