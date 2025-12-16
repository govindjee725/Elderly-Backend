import mongoose from "mongoose";

const medicineLogSchema = new mongoose.Schema({
  medicine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Medicine",
    required: true
  },

  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true
  },

  date: {
    type: String, // "2025-01-16"
    required: true
  },

  time: {
    type: String, // "08:00"
    required: true
  },

  status: {
    type: String,
    enum: ["taken", "missed"],
    default: "missed"
  },

  takenAt: {
    type: Date
  }

}, { timestamps: true });

export default mongoose.model("MedicineLog", medicineLogSchema);
