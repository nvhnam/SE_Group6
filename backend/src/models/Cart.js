import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  Customer_ID: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  Created_Date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Cart = model("Cart", cartSchema);

export default Cart;
