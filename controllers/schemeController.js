import Scheme from "../models/schemeModel.js";

// CREATE
export const createScheme = async (req, res) => {
  try {
    const scheme = await Scheme.create(req.body);
    res.status(201).json(scheme);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// READ ALL
export const getSchemes = async (req, res) => {
  try {
    const schemes = await Scheme.find();
    res.json(schemes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
export const updateScheme = async (req, res) => {
  try {
    const scheme = await Scheme.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(scheme);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
export const deleteScheme = async (req, res) => {
  try {
    await Scheme.findByIdAndDelete(req.params.id);
    res.json({ message: "Scheme deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
