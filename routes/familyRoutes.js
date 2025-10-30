import express from "express";
import FamilyMember from "../models/familyMemberModel.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const member = await FamilyMember.create(req.body);
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
router.put("/:id", async (req, res) => {
  const updated = await FamilyMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await FamilyMember.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});

export default router;
