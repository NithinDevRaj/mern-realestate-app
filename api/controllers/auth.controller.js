import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import errorHandler from "../utils/error.handler.js";
import jwt from "jsonwebtoken";
const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  //hashing password
  const hashedPassword = bcryptjs.hashSync(password, 10);

  try {
    const newUser = await new User({
      userName: username,
      email,
      password: hashedPassword,
    }).save();
    console.log(newUser);

    res.status(201).json("User created succesfully");
  } catch (error) {
    console.log("message", error);
    next(error);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(404, "wrong credentials"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export { signup, signin };
