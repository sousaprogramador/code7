const routes = require("express").Router();
const authMiddleware = require("./api/middleware/auth");

const FinancialController = require("./api/controllers/FinancialController");
const UserController = require("./api/controllers/UserController");
const AuthController = require("./api/controllers/AuthController");

routes.post("/user", UserController.store);
routes.get("/user", UserController.index);
routes.get("/user/:_id", UserController.show);
routes.put("/user/:_id", UserController.update);
routes.delete("/user/:_id", UserController.destroy);

routes.post("/user/login", AuthController.store);

//routes.use(authMiddleware);

routes.post("/financial", FinancialController.store);
routes.get("/financial", FinancialController.index);
routes.get("/financial/:_id", FinancialController.show);
routes.put("/financial/:_id", FinancialController.update);
routes.delete("/financial/:_id", FinancialController.destroy);

routes.get("/", (req, res) => {
  return res.status(200).json({ message: "Api is running" });
});

module.exports = routes;