import mongoose from "mongoose";

const doctorPatientSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" }
});

export default mongoose.model("DoctorPatient", doctorPatientSchema);
