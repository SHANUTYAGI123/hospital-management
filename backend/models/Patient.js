import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: String,
  ssn: String,
  insurance: String,
  date_admitted: Date,
  date_checked_out: Date
});

export default mongoose.model("Patient", patientSchema);
