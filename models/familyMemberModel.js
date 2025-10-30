import mongoose from "mongoose";

const familyMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  relation: { type: String, required: true },
  status: { type: String, default: "Good" },
}, { timestamps: true });

export default mongoose.model("FamilyMember", familyMemberSchema);
