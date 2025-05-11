const express = require("express");
const router = express.Router();
const { addDrive, getDrives,updateDrive,deleteDrive } = require("../controllers/driveController");

router.post("/", addDrive);
router.get("/", getDrives);
router.put("/:id", updateDrive);
router.delete("/:id", deleteDrive);  

module.exports = router;
