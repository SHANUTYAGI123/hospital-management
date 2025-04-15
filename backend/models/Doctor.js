import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: String,
  dssn: String,
  specialization: String
});

export default mongoose.model("Doctor", doctorSchema);
