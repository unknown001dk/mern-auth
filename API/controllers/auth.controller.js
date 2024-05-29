import User from '../models/User.model.js';
import bcryptjs from 'bcrypt';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'

export const signup = async(req, res, next) => {
  // console.log(req.body);
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try{
    await newUser.save()
    res.status(201).json({
      message: "user created sucessfully"
    });
  } catch (error) {
    next(error);
  }
};

export const login = async(req, res, next) => {
  const { email, password } = req.body;
  try{
    // verify user
    const validUser = await User.findOne({ email });
    if(!validUser){
      return next(errorHandler(401, "User not found"));
    }

    // verify password
    const isPasswordCorrect = bcryptjs.compareSync(password, validUser.password);
    if(!isPasswordCorrect){
      return next(errorHandler(401, "Wrong credentials"));
    }

    // create token
    const token = jwt.sign(
      {
        id: validUser._id,
      },
      process.env.JWT_SECRET
    );

    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000);
    res
      .cookie('access_token', token, {httpOnly: true, expires: expiryDate})
      .status(200)
      .json(rest)
  } catch (error) {
    next(error);
  }
};