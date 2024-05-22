import jwt from "jsonwebtoken";
import Customer from "../models/Customer.js";
import Admin from "../models/Admin.js";

export const authenticate = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user = await Customer.findById(decoded.user.id);

    if (!user) {
      user = await Admin.findById(decoded.user.id);
      if (!user) {
        return res
          .status(401)
          .json({ message: "Invalid token, user not found" });
      }
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};
