import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
  name: String,
  dosage: String,
  frequency: String,
  notes: String,
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true
  }
});

const Medicine = mongoose.model("Medicine", medicineSchema);
export default Medicine;
