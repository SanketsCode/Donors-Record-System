const Model = require("../../model");

//create a Recipt
// -> transaction create

module.exports.addRecipt = async (req, res) => {
  try {
    const { Donors_Name, Donors_Money, recipt_date } = req.body;
    const transaction = await Model.Transaction.create({
      name: Donors_Name,
      money: Donors_Money,
      date: recipt_date,
      status: "Income",
    });

    await transaction.save();

    const new_recipt = await Model.Recipt.create({
      transaction_id: transaction._id,
      ...req.body,
    });

    await new_recipt.save();
    return res.status(200).json({ msg: "Successfull", new_recipt });
  } catch (error) {
    return res.status(400).json({ error: "ERROR_WHILE_CREATING_RECIPT" });
  }
};

//all recipts
module.exports.allRecipts = async (req, res) => {
  try {
    const getAll = await Model.Recipt.find({});
    return res.status(200).json({ msg: "Successfull", data: getAll });
  } catch (error) {
    return res
      .status(400)
      .json({ error: "ERROR_WHILE_GETTING_RECIPT_ALL_DATA" });
  }
};

//Perticular Recipt Route
module.exports.getARecipt = async (req, res) => {
  try {
    const id = req.params.id;
    const getData = await Model.Recipt.findOne({ _id: id });
    return res.status(200).json({ msg: "Successfull", recipt: getData });
  } catch (error) {
    return res.status(400).json({ error: "ERROR_WHILE_GETTING_RECIPT" });
  }
};

module.exports.updateRecipt = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      recipt_no,
      recipt_date,
      Donors_Name,
      Donors_Address,
      mobile,
      Donors_Money,
      refer,
    } = req.body;

    const updateData = await Model.Recipt.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          recipt_no,
          recipt_date,
          Donors_Name,
          Donors_Address,
          mobile,
          Donors_Money,
          refer,
        },
      }
    );

    await updateData.save();

    const updateTransaction = await Model.Transaction.findOneAndUpdate(
      { _id: updateData.transaction_id },
      {
        $set: {
          name: Donors_Name,
          money: Donors_Money,
        },
      }
    );

    await updateTransaction.save();

    return res.status(200).json({ msg: "Successfull" });
  } catch (error) {
    return res.status(400).json({ error: "ERROR_WHILE_UPDATING_RECIPT" });
  }
};

//delete recipt
module.exports.deleteRecipts = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteRecipt = await Model.Recipt.findOneAndDelete({ _id: id });
    const deleteTransaction = await Model.Transaction.findOneAndDelete({
      _id: deleteRecipt.transaction_id,
    });
    return res.status(200).json({ msg: "Successfully" });
  } catch (error) {
    return res.status(400).json({ error: "ERROR_WHILE DELETING" });
  }
};

//Expense Guide

//Create an Expense
module.exports.createExpense = async (req, res) => {
  try {
    const { title, money, date } = req.body;
    const transaction = await Model.Transaction.create({
      name: title,
      money,
      status: "Expense",
      date,
    });

    await transaction.save();

    const expense = await Model.Expense.create({
      transaction_id: transaction._id,
      ...req.body,
    });

    await expense.save();

    return res.status(200).json({ msg: "Successfull", expense });
  } catch (error) {
    return res.status(400).json({ error: "ERROR_WHILE_CREATING_EXPENSE" });
  }
};

module.exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Model.Expense.find({});
    return res.status(200).json({ msg: "Successfull", expenses });
  } catch (error) {
    return res.status(400).json({ error: "ERROR_WHILE_GETTING_EXPENSES" });
  }
};

module.exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteExpense = await Model.Expense.findOneAndDelete({ _id: id });
    const deleteTransaction = await Model.Transaction.findOneAndDelete({
      _id: deleteExpense.transaction_id,
    });
    return res.status(200).json({ msg: "Successfull" });
  } catch (error) {
    return res.status(400).json({ error: "ERROR_WHILE_DELETE_EXPENSES" });
  }
};

module.exports.addBankMoney = async (req, res) => {
  try {
    const { money, date } = req.body;
    console.log(money);
    const transaction = await Model.Transaction.create({
      name: "Bank Interest",
      money,
      status: "Income",
      date,
    });

    await transaction.save();

    const bankMoney = await Model.Bank.create({
      transaction_id: transaction._id,
      ...req.body,
    });

    await bankMoney.save();

    return res.status(200).json({ msg: "Successfull", bankMoney });
  } catch (error) {
    return res.status(400).json({ error: "ERROR_WHILE_ADDING_BANK_INTEREST" });
  }
};

module.exports.removeBankMoney = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBank = await Model.Bank.findOneAndDelete({ _id: id });
    const deleteTransaction = await Model.Transaction.findOneAndDelete({
      _id: deleteBank.transaction_id,
    });
    return res.status(200).json({ msg: "Successfull" });
  } catch (error) {
    return res.status(400).json({ error: "ERROR_WHILE_REMOVE_BANK_INTEREST" });
  }
};

module.exports.getAllBankMoney = async (req, res) => {
  try {
    const bank = await Model.Bank.find({});
    return res.status(200).json({ msg: "Successfull", data: bank });
  } catch (error) {
    return res.status(400).json({ error: "ERROR_WHILE_ALL_BANK_DETAILS" });
  }
};

module.exports.allInfo = async (req, res) => {
  try {
    let recipt_rs = 0;
    let expense_rs = 0;
    let bank_rs = 0;

    const getRecipts = await Model.Recipt.find({});
    getRecipts.map((recipt) => {
      recipt_rs = parseFloat(recipt.Donors_Money) + parseFloat(recipt_rs);
    });

    const getExpenses = await Model.Expense.find({});
    getExpenses.map((expense) => {
      expense_rs = parseFloat(expense.money) + parseFloat(expense_rs);
    });

    const BankMoney = await Model.Bank.find({});
    BankMoney.map((bank) => {
      bank_rs = parseFloat(bank.money) + parseFloat(bank_rs);
    });

    const allTransactions = await Model.Transaction.find({});

    return res.status(200).json({
      msg: "Successfull",
      recipt_rs,
      expense_rs,
      bank_rs,
      allTransactions,
    });
  } catch (error) {
    return res.status(400).json({ error: "ERROR_WHILE_GETTING_ALL_INFO" });
  }
};
