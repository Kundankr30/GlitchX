const mongoose = require('mongoose');

const ReadingSchema = new mongoose.Schema(
  {
    locationName: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    so2: { type: Number, required: true },
    no2: { type: Number, required: true },
    spm: { type: Number, required: true },
    aqi: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Reading || mongoose.model('Reading', ReadingSchema);


