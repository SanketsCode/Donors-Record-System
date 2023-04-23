const router = require("express").Router();
const Controller = require("../controllers");

router.post("/login", Controller.UserController.login);
router.get("/getAllRecipts/:mobile", Controller.UserController.getAllRecipts);
router.get("/getUser/:mobile", Controller.UserController.getUser);

module.exports = router;
