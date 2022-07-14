const express = require("express");
const router = express.Router();
const employeeController= require("../Controllers/EmployeeController")



router.post("/BusinessCard",employeeController.employeeData)

router.get("/BusinessCard/:Id",employeeController.getEmployeeDetail)























module.exports = router;