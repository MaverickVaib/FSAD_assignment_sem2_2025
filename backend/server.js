const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/students");

dotenv.config();
connectDB();


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/students", studentRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

const driveRoutes = require("./routes/drives");
app.use("/api/drives", driveRoutes);

const dashboardRoutes = require("./routes/dashboard");
app.use("/api/dashboard", dashboardRoutes);

