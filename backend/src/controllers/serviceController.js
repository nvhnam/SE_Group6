// import { find, findById } from "../models/Service.js";

export async function getAllServices(req, res) {
  try {
    const services = await find();

    res.json(services);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function getServiceById(req, res) {
  try {
    const { id } = req.params;

    const service = await findById(id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(service);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function updateService(req, res) {
  const { id } = req.params;
  const { name, description, price } = req.body;

  try {
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (name) service.name = name;
    if (description) service.description = description;
    if (price) service.price = price;

    await service.save();

    res.status(200).json({ message: "Service updated successfully", service });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
}
