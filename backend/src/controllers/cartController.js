import Cart from "../models/Cart.js";
import mongoose from "mongoose";

export const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.json(carts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getCartById = async (req, res) => {
  const { cartID } = req.params;
  try {
    const cart = await Cart.findOne({ Cart_ID: cartID });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json(cart);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateCart = async (req, res) => {
  const { cartID } = req.params;
  const updates = req.body;
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { Cart_ID: cartID },
      updates,
      {
        new: true,
      }
    );
    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json(updatedCart);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createCart = async (req, res) => {
  try {
    const { Cart_ID } = req.body;

    const existingCart = await Cart.findOne({ Cart_ID });
    if (existingCart) {
      return res
        .status(400)
        .json({ message: "Cart with this ID already exists" });
    }

    const newCart = new Cart({
      Cart_ID: new mongoose.Types.ObjectId(),
      Customer_ID: req.body.Customer_ID,
    });

    await newCart.save();
    res.status(201).json(newCart);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteCart = async (req, res) => {
  const { cartID } = req.params;
  try {
    const deletedCart = await Cart.findOneAndDelete({ Cart_ID: cartID });
    if (!deletedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json({ message: "Cart deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
