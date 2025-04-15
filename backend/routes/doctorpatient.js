import express from "express";
import DoctorPatient from "../models/DoctorPatient.js";

const router = express.Router();

// Assign doctor to patient
router.post("/", async (req, res) => {
  try {
    const assignment = new DoctorPatient(req.body);
    await assignment.save();
    res.status(201).json(assignment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all assignments
router.get("/", async (req, res) => {
  try {
    const assignments = await DoctorPatient.find().populate('doctor').populate('patient');
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete assignment
router.delete("/:id", async (req, res) => {
  try {
    await DoctorPatient.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
