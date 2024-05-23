import Customer from "../models/Customer.js";
import Cart from "../models/Cart.js";
import mongoose from "mongoose";

export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getCustomerById = async (req, res) => {
  const { customerID } = req.params;

  try {
    const customer = await Customer.findOne({ Customer_ID: customerID });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createCustomer = async (req, res) => {
  try {
    const newCustomer = new Customer({
      Customer_ID: new mongoose.Types.ObjectId(),
      Name: req.body.Name,
      Email: req.body.Email,
      Password: req.body.Password,
      Address: req.body.Address,
      PhoneNumber: req.body.PhoneNumber,
    });

    const existingCustomer = await Customer.findOne({
      Customer_ID: newCustomer.Customer_ID,
    });
    if (existingCustomer) {
      return res
        .status(400)
        .json({ message: "Customer with this ID already exists" });
    } else {
      const savedCustomer = await newCustomer.save();
      res.status(201).json(savedCustomer);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateCustomer = async (req, res) => {
  const { customerID } = req.params;
  const { Customer_ID, Name, Email, Password, Address, PhoneNumber } = req.body;

  try {
    const updatedCustomer = await Customer.findOneAndUpdate(
      { Customer_ID: customerID },
      { Customer_ID, Name, Email, Password, Address, PhoneNumber },
      { new: true, runValidators: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(updatedCustomer);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteCustomer = async (req, res) => {
  const { customerID } = req.params;

  try {
    const deletedCustomer = await Customer.findOneAndDelete({
      Customer_ID: customerID,
    });

    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAllCartsForCustomer = async (req, res) => {
  const { customerID } = req.params;
  try {
    const carts = await Cart.find({ Customer_ID: customerID });
    res.json(carts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getCartForCustomerById = async (req, res) => {
  const { customerID, cartID } = req.params;
  try {
    const cart = await Cart.findOne({
      Customer_ID: customerID,
      Cart_ID: cartID,
    });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json(cart);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createCartForCustomer = async (req, res) => {
  const { customerID } = req.params;
  const { Cart_ID, Created_Date } = req.body;
  try {
    const newCart = new Cart({
      Cart_ID,
      Customer_ID: customerID,
      Created_Date,
    });
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateCartForCustomer = async (req, res) => {
  const { customerID, cartID } = req.params;
  const { Cart_ID, Created_Date } = req.body;
  try {
    let cart = await Cart.findOneAndUpdate(
      { Customer_ID: customerID, Cart_ID: cartID },
      { Cart_ID, Created_Date },
      { new: true }
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json(cart);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteCartForCustomer = async (req, res) => {
  const { customerID, cartID } = req.params;
  try {
    const cart = await Cart.findOneAndDelete({
      Customer_ID: customerID,
      Cart_ID: cartID,
    });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json({ message: "Cart deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
