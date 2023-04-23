const router = require("express").Router();
const { Auth } = require("../../common");
const Controller = require("../controllers");

router.post("/createAdmin", Controller.AdminController.createAdmin);
router.post("/login", Controller.AdminController.login);
router.get("/getUser", Auth.verifyAdmin, Controller.AdminController.getAdmin);
module.exports = router;
