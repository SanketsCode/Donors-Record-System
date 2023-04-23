const Model = require("../../model");

module.exports.login = async (req, res) => {
  try {
    const { mobile } = req.body;

    const login = await Model.Recipt.find({ mobile }); //[]
    if (login.length > 0) {
      return res.status(200).json({
        msg: "Successfull",
        user: {
          username: login[0].Donors_Name,
          mobile,
        },
      });
    } else {
      return res.status(400).json({ error: "NO_RECIPT" });
    }
  } catch (error) {
    return res.status(400).json({ error: "ERROR_WHILE_LOGIN" });
  }
};

module.exports.getAllRecipts = async (req, res) => {
  try {
    const { mobile } = req.params;
    const data = await Model.Recipt.find({ mobile });
    return res.status(200).json({ msg: "Successfull", data });
  } catch (error) {
    return res.status(400).json({ error: "ERROR_WHILE_GETTING_RECIPT" });
  }
};

module.exports.getUser = async (req, res) => {
  try {
    const { mobile } = req.params;
    const getUser = await Model.Recipt.findOne({ mobile });
    if (getUser) {
      return res.status(200).json({
        msg: "Successfull",
        user: {
          username: getUser.Donors_Name,
          mobile,
        },
      });
    } else {
      return res.status(400).json({ error: "NO User" });
    }
  } catch (error) {
    return res.status(400).json({ error: "NO_USER" });
  }
};
