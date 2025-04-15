import express from "express";
import TestLog from "../models/TestLog.js";

const router = express.Router();

// Create test log
router.post("/", async (req, res) => {
  try {
    const testLog = new TestLog(req.body);
    await testLog.save();
    res.status(201).json(testLog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all test logs
router.get("/", async (req, res) => {
  try {
    const testLogs = await TestLog.find().populate('patient').populate('test');
    res.json(testLogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get test log by ID
router.get("/:id", async (req, res) => {
  try {
    const testLog = await TestLog.findById(req.params.id).populate('patient').populate('test');
    if (!testLog) return res.status(404).json({ error: "Not found" });
    res.json(testLog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update test log
router.put("/:id", async (req, res) => {
  try {
    const testLog = await TestLog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(testLog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete test log
router.delete("/:id", async (req, res) => {
  try {
    await TestLog.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
