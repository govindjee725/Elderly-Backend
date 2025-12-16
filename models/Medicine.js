import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
  name: String,
  dosage: String,
  frequency: String,
  
  time: {
    type: String,        // "08:00"
    required: true
  },

  days: {
    type: [String],      // ["Mon", "Tue", "Wed"]
    required: true
  },

  repeat: {
    type: Boolean,
    default: true
  },

  startDate: {
    type: Date,
    default: Date.now
  },
  notes: String,
  image: String,
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true
  }
});

const Medicine = mongoose.model("Medicine", medicineSchema);
export default Medicine;
