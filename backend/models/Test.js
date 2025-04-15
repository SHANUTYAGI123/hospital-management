import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  test_id: String,
  test_name: String,
  date: Date,
  time: String,
  result: String
});

export default mongoose.model("Test", testSchema);
