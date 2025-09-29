const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
let mongoConnected = false;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/readings', require('./routes/readings'));
app.use('/api/forecast', require('./routes/forecast'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', db: mongoConnected ? 'connected' : 'disconnected', timestamp: new Date().toISOString() });
});

app.get('/api/db-status', (req, res) => {
  res.json({ connected: mongoConnected });
});

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/glitchx';
const PORT = process.env.PORT || 5000;

async function start() {
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });

  try {
    await mongoose.connect(MONGO_URI);
    mongoConnected = true;
    console.log('Connected to MongoDB');
  } catch (err) {
    mongoConnected = false;
    console.error('MongoDB connection failed. Continuing without DB.');
  }
}

start();


