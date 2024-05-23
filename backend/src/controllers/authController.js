import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Customer from "../models/Customer.js";
import Admin from "../models/Admin.js";

export const register = async (req, res) => {
  const { name, email, password, address, phoneNumber } = req.body;

  try {
    let user = await Customer.findOne({ Email: email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new Customer({
      Name: name,
      Email: email,
      Password: password,
      Address: address,
      PhoneNumber: phoneNumber,
    });

    const salt = await bcrypt.genSalt(10);
    user.Password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await Admin.findOne({ Email: email });
    if (!user) {
      user = await Customer.findOne({ Email: email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    }

    const isAdmin = user instanceof Admin;

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
        isAdmin: isAdmin,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "2h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const logout = (req, res) => {
  if (req.user) {
    const username = req.user.username;
    req.user = null;
    return res
      .status(200)
      .json({ message: `${username} logged out successfully` });
  } else {
    return res.status(400).json({ message: "No user to log out" });
  }
};
