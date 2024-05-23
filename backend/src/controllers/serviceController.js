import Service from "../models/service.js";
import mongoose from "mongoose";

export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getServiceById = async (req, res) => {
  const { serviceID } = req.params;

  try {
    const service = await Service.findOne({ Service_ID: serviceID });
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json(service);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createService = async (req, res) => {
  try {
    const newService = new Service({
      Service_ID: new mongoose.Types.ObjectId(),
      Service_name: req.body.Service_name,
      Description: req.body.Description,
      Price: req.body.Price,
    });

    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateService = async (req, res) => {
  const { serviceID } = req.params;

  try {
    const updatedService = await Service.findOneAndUpdate(
      { Service_ID: serviceID },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(updatedService);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteService = async (req, res) => {
  const { serviceID } = req.params;

  try {
    const deletedService = await Service.findOneAndDelete({
      Service_ID: serviceID,
    });

    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createServices = async (req, res) => {
  try {
    const services = req.body.services;

    const existingService = await Service.findOne({
      Service_ID: services.Service_ID,
    });
    if (existingService) {
      return res
        .status(400)
        .json({ message: "Service with this ID already exists" });
    } else {
      const savedServices = await Service.insertMany(services);
      res.status(201).json(savedServices);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
