import Cart from "../models/Cart.js";
import Schedule from "../models/Schedule.js";

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
  const { cartId } = req.params;
  try {
    const cart = await Cart.findById(cartId);
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
  const { cartId } = req.params;
  const updates = req.body;
  try {
    const updatedCart = await Cart.findByIdAndUpdate(cartId, updates, {
      new: true,
    });
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
    const { cartId } = req.body;

    const existingCart = await Cart.findById(cartId);
    if (existingCart) {
      return res
        .status(400)
        .json({ message: "Cart with this ID already exists" });
    }

    const newCart = new Cart({
      Customer_ID: req.body.Customer_ID,
      Created_Date: Date.now(),
    });

    await newCart.save();
    res.status(201).json(newCart);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteCart = async (req, res) => {
  const { cartId } = req.params;
  try {
    const deletedCart = await Cart.findByIdAndDelete(cartId);
    if (!deletedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json({ message: "Cart deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getSchedulesByCartId = async (req, res) => {
  const { cartId } = req.params;

  try {
    const schedules = await Schedule.find({ Cart_ID: cartId });
    res.status(200).json(schedules);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
