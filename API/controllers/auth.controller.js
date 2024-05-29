import User from '../models/User.model.js';
import bcryptjs from 'bcrypt';

export const signup = async(req, res) => {
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
    res.status(500).json(error.message);
  }
};