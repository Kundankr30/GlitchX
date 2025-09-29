const express = require('express');
const { spawn } = require('child_process');
const path = require('path');

const router = express.Router();

router.get('/', async (req, res) => {
  const scriptPath = path.resolve(__dirname, '../../../predict_aqi.py');
  const py = spawn('python3', [scriptPath]);

  let output = '';
  let error = '';

  py.stdout.on('data', (data) => { output += data.toString(); });
  py.stderr.on('data', (data) => { error += data.toString(); });

  py.on('close', (code) => {
    if (code !== 0) return res.status(500).json({ error: 'python_error', details: error });
    res.json({ ok: true, output });
  });
});

module.exports = router;


