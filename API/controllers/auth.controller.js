import User from '../models/User.model.js';
import bcryptjs from 'bcrypt';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'


// register controller
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

// login controller
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

// google login controller

export const google = async(req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET
      );
      const { password: hashedPassword,...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000);
      res
        .cookie('access_token', token, {httpOnly: true, expires: expiryDate})
        .status(200)
        .json(rest)
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) +  Math.random().toString(36).slice(-8);

      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      //const Username = Split(' ').join('').toLowercase() + Math.random().toString(36).slice(-8);
      const newUser = new User({
        username: req.body.name,
        // here we have the problem and user name is not unique.. need to change it and update the username from the req.body.name
        // use below username1 
        // username1: req.body.name.split(' ').join('').toLowercase() + Math.random().toString(36).slice(-8),
        email: req.body.email,
        password:  hashedPassword,
        profilePicture: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign(
        {
          id: newUser._id,
        },
        process.env.JWT_SECRET
      );
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000);
      res.cookie('access_token', token, {
        httpOnly: true,
        expires: expiryDate,
      }).status(200).json(rest);
    }
  } catch (error) {
    next(error);
  }
};