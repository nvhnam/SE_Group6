import { Schema, model } from "mongoose";

const customerSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: Number,
    required: true,
  },
});

const Customer = model("Customer", customerSchema);

export default Customer;
