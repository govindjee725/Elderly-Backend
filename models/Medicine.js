import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dosage: { type: String },
  time: { type: String },
  person: { type: String },  // Reference to family member
  status: { type: String, default: "Upcoming" },
});

export default mongoose.model("Medicine", medicineSchema);
