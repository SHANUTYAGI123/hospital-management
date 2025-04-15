import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

import patientRoutes from "./routes/patient.js";
import doctorRoutes from "./routes/doctor.js";
import testRoutes from "./routes/test.js";
import testLogRoutes from "./routes/testlog.js";
import doctorPatientRoutes from "./routes/doctorpatient.js";

const app = express();
const PORT = 5001;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/hospital", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/testlogs", testLogRoutes);
app.use("/api/doctorpatients", doctorPatientRoutes);

app.get("/", (req, res) => {
  res.send("Hospital Management API Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
