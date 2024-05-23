import Order from "../models/Order.js";
import Payment from "../models/paymentModel.js";
import mongoose from "mongoose";

export const createPayment = async (req, res) => {
  try {
    const order = await Order.findOne(req.body.Order_ID);
    if (!order) {
      return res.status(404).json({ message: "Order ID not found" });
    }

    const newPayment = new Payment({
      Payment_ID: new mongoose.Types.ObjectId(),
      Order_ID: req.body.Order_ID,
      PaymentDate: req.body.PaymentDate,
      Amount: req.body.Amount,
      PaymentMethod: req.body.PaymentMethod,
    });
    const existingPayment = await Payment.findOne({
      Payment_ID: newPayment.Payment_ID,
    });
    if (existingPayment) {
      return res
        .status(400)
        .json({ message: "Payment with this ID already exists" });
    } else {
      const savedPayment = await newPayment.save();
      res.status(201).json(savedPayment);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getPaymentByOrderID = async (req, res) => {
  const { orderID } = req.params;

  try {
    const payment = await Payment.findOne({ Order_ID: orderID });
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json(payment);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
