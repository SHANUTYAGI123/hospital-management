import mongoose from "mongoose";

const testLogSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  test: { type: mongoose.Schema.Types.ObjectId, ref: "Test" },
  date: Date,
  result: String
});

export default mongoose.model("TestLog", testLogSchema);
