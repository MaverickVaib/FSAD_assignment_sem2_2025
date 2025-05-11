/**
 * @file Defines the Mongoose schema and model for the "Student" collection.
 * This schema represents student data, including personal details, vaccination status,
 * and vaccination records linked to vaccination drives.
 */
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  studentId: { type: String, required: true, unique: true },
  class: { type: String, required: true },
  vaccinated: { type: Boolean, default: false },
  vaccinationRecord: [
    {
      vaccineName: String,
      date: Date,
      driveId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Drive",
      },
    },
  ]
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);
