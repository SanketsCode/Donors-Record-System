const router = require("express").Router();
const routes = require("./routes");
const Routes = require("./routes");

router.use("/admin", Routes.AdminRoutes);
router.use("/recipt", Routes.ReciptRoutes);
router.use("/user", Routes.UserRoutes);

module.exports = router;
