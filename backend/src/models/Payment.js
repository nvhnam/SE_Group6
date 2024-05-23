// paymentModel.js

import { Schema, model } from "mongoose";

const paymentSchema = new Schema({
  Payment_ID: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  Order_ID: {
    type: Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  PaymentDate: {
    type: Date,
    required: true,
  },
  Amount: {
    type: Number,
    required: true,
  },
  PaymentMethod: {
    type: String,
    required: true,
  },
});

const Payment = model("Payment", paymentSchema);

export default Payment;
