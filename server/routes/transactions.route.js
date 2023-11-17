const express = require("express");
const router = express.Router();

// controllers
const {
  addIncome,
  getIncomes,
  deleteIncome,
} = require("../controllers/incomeController");

const {
  addExpense,
  getExpense,
  deleteExpense,
} = require("../controllers/expenseController");

router.post("/add-income", addIncome);
router.post("/add-expense", addExpense);

router.get("/get-incomes", getIncomes);
router.get("/get-expenses", getExpense);

router.delete("/delete-income/:id", deleteIncome);
router.delete("/delete-expense/:id", deleteExpense);

module.exports = router;
