import express from "express";
import Medicine from "../models/Medicine.js";
import Member from "../models/familyMemberModel.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// ➕ Add medicine for a specific member
router.post("/:memberId", async (req, res) => {
  try {
    const { memberId } = req.params;
    const { name, dosage, frequency, notes } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const medicine = new Medicine({
      name,
      dosage,
      frequency,
      notes,
      image: imageUrl,
      member: memberId,
    });
    await medicine.save();

    // also push reference to member
    await Member.findByIdAndUpdate(memberId, {
      $push: { medicines: medicine._id },
    });

    res.status(201).json(medicine);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📄 Get medicines for a specific member
router.get("/:memberId", async (req, res) => {
  try {
    const medicines = await Medicine.find({
      member: req.params.memberId,
    });
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✏️ Edit medicine
router.put("/:id", async (req, res) => {
  try {
    const updated = await Medicine.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ❌ Delete medicine
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Medicine.findByIdAndDelete(req.params.id);
    if (deleted) {
      await Member.updateOne(
        { _id: deleted.member },
        { $pull: { medicines: deleted._id } }
      );
    }
    res.json({ message: "Medicine deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
