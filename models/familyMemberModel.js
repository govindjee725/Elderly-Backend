import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: String,
  age: Number,
  relation: String,
  gender: String,
  phone: String,
  address: String,
  image: String,
  medicines: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine"
    }
  ],
});

const Member = mongoose.model("Member", memberSchema);
export default Member;
