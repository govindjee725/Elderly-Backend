import express from "express";
import Medicine from "../models/Medicine.js";
import Member from "../models/familyMemberModel.js";
import { upload } from "../middleware/upload.js";
import { imagekit } from "../config/imagekit.js"; // ✅ ONLY ONCE, AT TOP

const router = express.Router();

// ➕ ADD MEDICINE WITH IMAGE (IMAGEKIT)
router.post("/:memberId", upload.single("image"), async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
      const uploaded = await imagekit.upload({
        file: req.file.buffer.toString("base64"),
        fileName: req.file.originalname,
        folder: "/elderly/medicines",
      });
      imageUrl = uploaded.url;
    }

    // ✅ FIX: PARSE REQUIRED FIELDS
    const time = req.body.time;
    const days = req.body.days
      ? JSON.parse(req.body.days)
      : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const medicine = await Medicine.create({
      name: req.body.name,
      dosage: req.body.dosage,
      frequency: req.body.frequency,
      notes: req.body.notes,
      time,        // ✅ REQUIRED
      days,        // ✅ REQUIRED
      member: req.params.memberId,
      image: imageUrl,
    });

    await Member.findByIdAndUpdate(req.params.memberId, {
      $push: { medicines: medicine._id },
    });

    res.status(201).json(medicine);
  } catch (err) {
    console.error("❌ Medicine upload error:", err);
    res.status(500).json({ message: err.message });
  }
});


// 📄 GET MEDICINES FOR MEMBER
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

// ❌ DELETE MEDICINE
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
