import { Schema, model } from "mongoose";

const serviceSchema = new Schema({
  Service_ID: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  Service_name: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Price: {
    type: String,
    required: true,
  },
});

const Service = model("Services", serviceSchema);

export default Service;
