const express = require("express");
const router = express.Router();

const budgetModel = require("../model/budget.model");
const expenseModel = require("../model/expense.model");

router.get("/demo", (req, res) => {
  res.send("Welcome to the Budget Tracker API");
});


module.exports = router;
