const mongoose = require("mongoose");

const driveSchema = new mongoose.Schema({
  vaccineName: { type: String, required: true },
  date: { type: Date, required: true },
  availableDoses: { type: Number, required: true },
  applicableClasses: [String]
}, { timestamps: true });

module.exports = mongoose.model("Drive", driveSchema);

// This schema defines the structure of a vaccination drive document in the MongoDB database.