const Expense = require("../models/expense.modal");

exports.addExpense = async (req, res) => {
  try {
    const { title, amount, category, description, date } = req.body;

    // validations
    if (!title || !amount || !category || !date) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the values",
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be greater than zero",
      });
    }

    // instance of income
    const expense = Expense({
      title,
      amount,
      category,
      description,
      date,
    });

    // saving to database
    await expense.save();

    // returning response
    return res.status(200).json({
      success: true,
      message: "Expense is added",
      expense,
    });
  } catch (error) {
    console.log("Error in add expense controller");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Expense not added",
    });
  }
};

exports.getExpense = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Expenses fetched",
      expenses,
    });
  } catch (error) {
    console.log("Error in get expense controller");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Expenses not fetched",
    });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedExpense = await Expense.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Expense Deleted Successfully",
      deletedExpense,
    });
  } catch (error) {
    console.log("Error in Expense delete controller");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Expense not deleted",
    });
  }
};
