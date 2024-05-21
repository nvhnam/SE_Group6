import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

// mongoose
//   .connect(process.env.DB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected..."))
//   .catch((err) => console.error("MongoDB connection error:", err));

app.use("/login", authRoutes);
app.use("/logout", authRoutes);
app.use("/register", authRoutes);
app.use("/services", serviceRoutes);
app.use("/checkout", checkoutRoutes);
app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Motor Servicing at Home website!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
