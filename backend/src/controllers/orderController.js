import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const newOrder = new Order({
      Order_ID: req.body.Order_ID,
      Customer_ID: req.body.Customer_ID,
      TotalAmount: req.body.TotalAmount,
      Status: req.body.Status,
      OrderDate: req.body.OrderDate,
    });
    const existingOrder = await Order.findOne({
      Order_ID: newOrder.Order_ID,
    });
    if (existingOrder) {
      return res
        .status(400)
        .json({ message: "Order with this ID already exists" });
    } else {
      const savedOrder = await newOrder.save();
      res.status(201).json(savedOrder);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getOrderById = async (req, res) => {
  const { orderID } = req.params;
  try {
    const order = await Order.findOne({ Order_ID: orderID });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateOrder = async (req, res) => {
  const { orderID } = req.params;
  const { TotalAmount, Status } = req.body;
  try {
    let order = await Order.findOneAndUpdate({ Order_ID: orderID });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.TotalAmount = TotalAmount;
    order.Status = Status;
    await order.save();
    res.json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteOrder = async (req, res) => {
  const { orderID } = req.params;
  try {
    let order = await Order.findOneAndDelete({ Order_ID: orderID });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    await order.remove();
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
