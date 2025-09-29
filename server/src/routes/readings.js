const express = require('express');
const mongoose = require('mongoose');
const Reading = require('../models/Reading');

const router = express.Router();

router.get('/', async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: 'db_disconnected' });
  }
  try {
    const docs = await Reading.find().sort({ createdAt: -1 }).limit(100);
    res.json(docs);
  } catch (e) {
    res.status(500).json({ error: 'failed_to_list' });
  }
});

router.post('/', async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: 'db_disconnected' });
  }
  try {
    const doc = await Reading.create(req.body);
    res.status(201).json(doc);
  } catch (e) {
    res.status(400).json({ error: 'invalid_payload' });
  }
});

module.exports = router;


