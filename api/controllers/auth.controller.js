import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    //hashing password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });

    //saving new user
    await newUser.save();
    res.status(201).json("User created succesfully");
  } catch (error) {
    next(error);
  }
};

export { signup };
