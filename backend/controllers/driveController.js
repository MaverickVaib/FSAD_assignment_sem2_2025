const Drive = require("../models/Drive.cjs");

const addDrive = async (req, res) => {
  try {
    const { vaccineName, date, availableDoses, applicableClasses } = req.body;

    if (new Date(date) < new Date()) {
      return res.status(400).json({ error: "Cannot schedule drive in the past" });
    }

    const drive = new Drive({ vaccineName, date, availableDoses, applicableClasses });
    await drive.save();

    res.status(201).json(drive);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getDrives = async (req, res) => {
  try {
    const drives = await Drive.find();
    res.json(drives);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/drives/:id
const updateDrive = async (req, res) => {
  try {
    const drive = await Drive.findById(req.params.id);
    if (!drive) return res.status(404).json({ error: "Drive not found" });

    const now = new Date();
    if (drive.date < now) {
      return res
        .status(400)
        .json({ error: "Cannot edit a past vaccination drive" });
    }

    await Drive.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Drive updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/drives/:id
const deleteDrive = async (req, res) => {
  try {
    await Drive.findByIdAndDelete(req.params.id);
    res.json({ message: "Drive deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addDrive, getDrives, updateDrive, deleteDrive };
