const router = require("express").Router();
const { Auth } = require("../../common");
const Controller = require("../controllers");

router.post("/create", Auth.verifyAdmin, Controller.ReciptController.addRecipt);
router.put(
  "/update/:id",
  Auth.verifyAdmin,
  Controller.ReciptController.updateRecipt
);
router.get("/getAll", Auth.verifyAdmin, Controller.ReciptController.allRecipts);
router.get(
  "/getARecipt/:id",
  Auth.verifyAdmin,
  Controller.ReciptController.getARecipt
);

router.delete(
  "/delete/:id",
  Auth.verifyAdmin,
  Controller.ReciptController.deleteRecipts
);

router.post(
  "/expense",
  Auth.verifyAdmin,
  Controller.ReciptController.createExpense
);
router.get(
  "/expenses",
  Auth.verifyAdmin,
  Controller.ReciptController.getAllExpenses
);
router.delete(
  "/expense/:id",
  Auth.verifyAdmin,
  Controller.ReciptController.deleteExpense
);

router.post(
  "/bank/create",
  Auth.verifyAdmin,
  Controller.ReciptController.addBankMoney
);
router.get(
  "/bank",
  Auth.verifyAdmin,
  Controller.ReciptController.getAllBankMoney
);
router.delete(
  "/bank/:id",
  Auth.verifyAdmin,
  Controller.ReciptController.removeBankMoney
);

router.get("/getAllInfo", Controller.ReciptController.allInfo);

module.exports = router;
