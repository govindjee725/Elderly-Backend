import express from "express";
import MedicineLog from "../models/MedicineLog.js";

const router = express.Router();

/**
 * ✅ MARK MEDICINE AS TAKEN
 * Called when user clicks "Taken"
 */
router.post("/taken", async (req, res) => {
  try {
    const { medicineId, memberId, date, time } = req.body;

    const log = await MedicineLog.findOneAndUpdate(
      { medicine: medicineId, date, time },
      {
        medicine: medicineId,
        member: memberId,
        date,
        time,
        status: "taken",
        takenAt: new Date(),
      },
      { upsert: true, new: true }
    );

    res.json({ success: true, log });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * 🔍 CHECK IF MEDICINE IS TAKEN
 * Used by Flutter to decide re-ring
 */
router.get("/check", async (req, res) => {
  try {
    const { medicineId, date, time } = req.query;

    const log = await MedicineLog.findOne({
      medicine: medicineId,
      date,
      time,
      status: "taken",
    });

    res.json({ taken: !!log });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * ❌ MARK MEDICINE AS MISSED
 * Optional but recommended
 */
router.post("/missed", async (req, res) => {
  try {
    const { medicineId, memberId, date, time } = req.body;

    await MedicineLog.findOneAndUpdate(
      { medicine: medicineId, date, time },
      {
        medicine: medicineId,
        member: memberId,
        date,
        time,
        status: "missed",
      },
      { upsert: true }
    );

    res.json({ missed: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
