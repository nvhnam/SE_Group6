import Mechanic from "../models/Mechanic.js";
import mongoose from "mongoose";

export const getMechanicByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const mechanic = await Mechanic.findOne({ email });
    if (!mechanic) {
      return res.status(404).json({ message: "Mechanic not found" });
    }
    res.json(mechanic);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getMechanicByName = async (req, res) => {
  const { name } = req.params;

  try {
    const mechanic = await Mechanic.findOne({ Mechanic_name: name });
    if (!mechanic) {
      return res.status(404).json({ message: "Mechanic not found" });
    }
    res.json(mechanic);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createMechanic = async (req, res) => {
  try {
    const newMechanic = new Mechanic({
      Mechanic_ID: new mongoose.Types.ObjectId(),
      Mechanic_name: req.body.Mechanic_name,
      password: req.body.password,
      email: req.body.email,
      skillSet: req.body.skillSet,
    });

    const existingMechanic = await Mechanic.findOne({
      Mechanic_ID: newMechanic.Mechanic_ID,
    });
    if (existingMechanic) {
      return res
        .status(400)
        .json({ message: "Mechanic with this ID already exists" });
    } else {
      const savedMechanic = await newMechanic.save();
      res.status(201).json(savedMechanic);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAllMechanics = async (req, res) => {
  try {
    const mechanics = await Mechanic.find();
    res.json(mechanics);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateMechanic = async (req, res) => {
  const { mechanicID } = req.params;

  try {
    const updatedMechanic = await Mechanic.findOneAndUpdate(
      { Mechanic_ID: mechanicID },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedMechanic) {
      return res.status(404).json({ message: "Mechanic not found" });
    }

    res.json(updatedMechanic);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteMechanic = async (req, res) => {
  const { mechanicID } = req.params;

  try {
    const deletedMechanic = await Mechanic.findOneAndDelete({
      Mechanic_ID: mechanicID,
    });

    if (!deletedMechanic) {
      return res.status(404).json({ message: "Mechanic not found" });
    }

    res.json({ message: "Mechanic deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
