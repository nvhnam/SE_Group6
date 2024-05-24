import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  Customer_ID: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  TotalAmount: {
    type: Number,
    required: true,
  },
  Status: {
    type: String,
    required: true,
  },
  OrderDate: {
    type: Date,
    required: true,
  },
});

const Order = model("Order", orderSchema);

export default Order;
