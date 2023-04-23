const { Utility, Auth } = require("../../common");
const Model = require("../../model");

module.exports.createAdmin = async (req, res) => {
  try {
    //check the email already exist
    let findAdmin = await Model.Admin.findOne({ email: req.body.email });
    if (findAdmin) {
      return res.status(400).json({ error: "Email Already Exist" });
    } else {
      const admin = await Model.Admin.create(req.body);
      await admin.setPassword(req.body.password);
      await admin.save();

      return res
        .status(200)
        .json({ msg: "ADMIN REGISTRATION SUCCESSFULL", admin });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Something goes Wrong" });
  }
};

module.exports.login = async (req, res) => {
  try {
    //check email exist
    let adminData = await Model.Admin.findOne({
      email: req.body.email,
    });

    if (!adminData) {
      return res.status(400).json({ error: "No Admin Exist" });
    }

    //check the password
    let match = await Utility.comparePasswordUsingBcrypt(
      req.body.password,
      adminData.password
    );

    if (!match) {
      return res.status(400).send({ message: "INVALID_CREDENTAILS" });
    }

    let accessTokenGenerate = Auth.getToken({
      _id: adminData._id,
      role: adminData.role,
    });

    adminData = await Model.Admin.findOneAndUpdate(
      { _id: adminData._id },
      {
        $set: {
          accessToken: accessTokenGenerate,
        },
      },
      { new: true }
    );

    return res.status(200).json({ msg: "ADMIN_LOGIN_SUCCESSFULL", adminData });
  } catch (error) {
    return res.status(400).json({ error: "ERROR_WHILE_LOGIN" });
  }
};

module.exports.getAdmin = async (req, res) => {
  try {
    let user = await Model.Admin.findOne({ _id: req.user._id });
    return res.status(200).json({ msg: "SUCCESSFULLY FETCHED", user });
  } catch (error) {
    return res.status(400).json({ error: "ERROR_WHILE_RETRIVING_ADMIN" });
  }
};
