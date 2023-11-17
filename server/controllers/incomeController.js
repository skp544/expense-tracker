const Income = require("../models/income.modal");

exports.addIncome = async (req, res) => {
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
    const income = Income({
      title,
      amount,
      category,
      description: description || "",
      date,
    });

    // saving to database
    await income.save();

    // returning response
    return res.status(200).json({
      success: true,
      message: "Income is added",
      income,
    });
  } catch (error) {
    console.log("Error in add income controller");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Income not added",
    });
  }
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Incomes fetched",
      incomes,
    });
  } catch (error) {
    console.log("Error in get income controller");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Income not fetched",
    });
  }
};

exports.deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedIncome = await Income.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Income Deleted Successfully",
      deletedIncome,
    });
  } catch (error) {
    console.log("Error in income delete controller");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Income not deleted",
    });
  }
};
