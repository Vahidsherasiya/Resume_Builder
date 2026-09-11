import express from 'express';
import { Resume } from '../models/Resume.js';

const router = express.Router();

// In-memory cache fallback in case MongoDB server is offline
let memoryStore = {};

// GET /api/resumes/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let resume = null;

    try {
      resume = await Resume.findOne({ id });
    } catch (dbErr) {
      // fallback
    }

    if (!resume && memoryStore[id]) {
      resume = memoryStore[id];
    }

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json(resume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/resumes
router.post('/', async (req, res) => {
  try {
    const resumeData = req.body;
    const id = resumeData.id || 'resume-default-01';
    resumeData.id = id;

    // Always update memory store
    memoryStore[id] = resumeData;

    try {
      const updated = await Resume.findOneAndUpdate(
        { id },
        resumeData,
        { upsert: true, new: true }
      );
      return res.status(200).json({ success: true, data: updated });
    } catch (dbErr) {
      return res.status(200).json({ success: true, savedToMemory: true, data: resumeData });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/resumes
router.get('/', async (req, res) => {
  try {
    let list = [];
    try {
      list = await Resume.find().sort({ updatedAt: -1 });
    } catch (dbErr) {
      list = Object.values(memoryStore);
    }
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
