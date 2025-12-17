import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import schemeRoutes from "./routes/schemeRoutes.js";
import familyRoutes from "./routes/familyRoutes.js";
import medicineRoutes from "./routes/medicineRoutes.js";
import medicineLogRoutes from "./routes/medicineLogRoutes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use("/api/schemes", schemeRoutes);
app.use("/api/family", familyRoutes);

app.use("/api/medicines", medicineRoutes);
app.use("/api/medicine-logs", medicineLogRoutes);
const PORT = process.env.PORT || 3000;
app.get("/",(req,res)=>{
  res.send("hello");
})
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT,"0.0.0.0", () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.log("❌ DB Connection Error:", err));
