const Student = require("../models/Student");
const Drive = require("../models/Drive.cjs");


const getDashboardStats = async (req, res) => {
  try {
    const total = await Student.countDocuments();
    const vaccinated = await Student.countDocuments({ vaccinated: true });
    const unvaccinated = total - vaccinated;

    const today = new Date();
    const next30 = new Date();
    next30.setDate(today.getDate() + 30);

     const upcomingDrives = await Drive.find({
      date: { $gte: today, $lte: next30 },
    }).sort({ date: 1 });


    res.json({
      totalStudents: total,
      vaccinated,
      unvaccinated,
      vaccinatedPercentage: total ? ((vaccinated / total) * 100).toFixed(2) : "0.00",
      upcomingDrives,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getDashboardStats };
