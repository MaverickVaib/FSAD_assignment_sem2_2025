// backend/controllers/studentController.js

const Student = require("../models/Student");

// GET all students
const getStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};

// POST a new student
const addStudent = async (req, res) => {
  const { name, studentId, class: studentClass } = req.body;
   
  const student = new Student({ name, studentId, class: studentClass });
  await student.save();
  res.status(201).json(student);
};

// PUT update student
const updateStudent = async (req, res) => {
  const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// DELETE a student
const deleteStudent = async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Student deleted" });
};

// POST mark student as vaccinated
const markVaccinated = async (req, res) => {

    const { id } = req.params;
    const { vaccineName, date } = req.body;

    const student = await Student.findById(id);
    if (!student) return res.status(404).json({ error: "Student not found" });

    const alreadyMarked = student.vaccinationRecord.some(
      (entry) => entry.vaccineName === vaccineName
    );

    if (alreadyMarked) {
      return res.status(400).json({ error: "Student already vaccinated for this vaccine." });
    }

    student.vaccinationRecord.push({ vaccineName, date: new Date(date) });
    student.vaccinated = true; // also set global vaccinated flag
    await student.save();

    res.json({ message: "Student marked as vaccinated.", student });
  
};


module.exports = {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  markVaccinated
};
