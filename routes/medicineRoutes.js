import express from "express";
import Medicine from "../models/Medicine.js";

const router = express.Router();

// ➕ Create
router.post("/", async (req, res) => {
  try {
    const newMed = new Medicine(req.body);
    await newMed.save();
    res.status(201).json(newMed);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📄 Read All
router.get("/", async (req, res) => {
  const meds = await Medicine.find();
  res.json(meds);
});

// ✏️ Update
router.put("/:id", async (req, res) => {
  try {
    const updated = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🗑 Delete
router.delete("/:id", async (req, res) => {
  try {
    await Medicine.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
