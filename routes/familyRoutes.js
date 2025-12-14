import express from "express";
import FamilyMember from "../models/familyMemberModel.js";
import { upload } from "../middleware/upload.js";
import { imagekit } from "../config/imagekit.js";
import fs from "fs";



const router = express.Router();

// CREATE MEMBER WITH IMAGE
router.post("/", upload.single("image"), async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
      const uploaded = await imagekit.upload({
        file: fs.readFileSync(req.file.path),
        fileName: req.file.filename,
        folder: "/elderly/members",
      });
      imageUrl = uploaded.url;
    }

    const member = await FamilyMember.create({
      ...req.body,
      image: imageUrl,
    });

    res.status(201).json(member);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ
router.get("/", async (req, res) => {
  const members = await FamilyMember.find();
  res.json(members);
});

// UPDATE
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.image;

    const updated = await FamilyMember.findByIdAndUpdate(
      req.params.id,
      { ...req.body, image: imageUrl },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  await FamilyMember.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});

export default router;
