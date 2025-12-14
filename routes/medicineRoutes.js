import express from "express";
import Medicine from "../models/Medicine.js";
import Member from "../models/familyMemberModel.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// ➕ Add medicine for a specific member
import { imagekit } from "../config/imagekit.js";
import { upload } from "../middleware/upload.js";

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

    const medicine = await Medicine.create({
      ...req.body,
      member: req.params.memberId,
      image: imageUrl,
    });

    await Member.findByIdAndUpdate(req.params.memberId, {
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
