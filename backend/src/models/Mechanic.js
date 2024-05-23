import { Schema, model } from "mongoose";

const mechanicSchema = new Schema({
  Mechanic_ID: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  Mechanic_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  skillSet: {
    type: [String],
    required: true,
  },
});

const Mechanic = model("Mechanics", mechanicSchema);

export default Mechanic;
