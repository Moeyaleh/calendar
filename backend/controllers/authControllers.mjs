import jwt from "jsonwebtoken";
import User from "../models/userModel.mjs";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "5d" });
};
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ msg: "username and password required" });
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ msg: "user exists" });

    const user = new User({ username, password });
    await user.save();

    const token = generateToken(user._id);
    res.status(201).json({
      token,
      user: { id: user._id, username: user.username },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ msg: "username and password required" });

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: "user doesn't exist" });

    const matchPassword = await user.comparePassword(password);
    if (!matchPassword) return res.status(400).json({ msg: "password wrong" });

    const token = generateToken(user._id);
    res.status(200).json({
      token,
      user: { id: user._id, username: user.username },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
