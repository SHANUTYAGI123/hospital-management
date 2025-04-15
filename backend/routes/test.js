import express from "express";
import Test from "../models/Test.js";

const router = express.Router();

// Create test
router.post("/", async (req, res) => {
  try {
    const test = new Test(req.body);
    await test.save();
    res.status(201).json(test);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all tests
router.get("/", async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get test by ID
router.get("/:id", async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) return res.status(404).json({ error: "Not found" });
    res.json(test);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update test
router.put("/:id", async (req, res) => {
  try {
    const test = await Test.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(test);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete test
router.delete("/:id", async (req, res) => {
  try {
    await Test.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
