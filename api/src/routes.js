const routes = require("express").Router();

const FinancialController = require("./api/controllers/FinancialController");
const UserController = require("./api/controllers/UserController");
const AuthController = require("./api/controllers/AuthController");

routes.post("/financial", FinancialController.store);
routes.get("/financial", FinancialController.index);
routes.get("/financial/:_id", FinancialController.show);

routes.post("/user", UserController.store);
routes.get("/user", UserController.index);
routes.get("/user/:_id", UserController.show);

routes.post("/auth", AuthController.store);

routes.get("/", (req, res) => {
  return res.status(200).json({ message: "Api is running" });
});

module.exports = routes;