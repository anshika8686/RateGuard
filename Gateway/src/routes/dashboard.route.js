
const express = require("express");
const dashboardRouter = express.Router();

const identifyUser = require("../middleware/userAuth.middleware");
const dashboardController = require("../controllers/dashboard.controller")
dashboardRouter.get(
    "/overview",
    identifyUser,
    dashboardController.getUserDashboardController
);

module.exports = dashboardRouter;
