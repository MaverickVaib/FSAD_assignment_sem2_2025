const express = require("express");
const router = express.Router();


// Import controller functions
const {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  markVaccinated,
} = require("../controllers/studentController");

// Routes
router.get("/", getStudents);            // GET /api/students
router.post("/", addStudent);           // POST /api/students
router.put("/:id", updateStudent);      // PUT /api/students/:id
router.delete("/:id", deleteStudent);   // DELETE /api/students/:id
router.put("/:id/vaccinate", markVaccinated); // POST /api/students/:id/vaccinate

module.exports = router;
