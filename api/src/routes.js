const routes = require("express").Router();

const FinancialController = require("./api/controllers/FinancialController");

routes.post("/financial", FinancialController.store);
routes.get("/financial", FinancialController.index);
routes.get("/financial/:_id", FinancialController.show);

routes.get("/", (req, res) => {
  return res.status(200).json({ message: "Api is running" });
});

module.exports = routes;