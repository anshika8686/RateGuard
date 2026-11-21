const express=require('express')
const analyticRouter=express.Router()

const adminAuth=require("../middleware/adminAuth.middleware")
const analyticController=require("../controllers/analytics.controller")

analyticRouter.get("/overview",adminAuth,analyticController.getAnalyticsOverviewController)
analyticRouter.get("/recent",adminAuth,analyticController.getRecentAnalyticsController)
analyticRouter.get("/weekusage",adminAuth,analyticController.getWeekAnalyticsController)
analyticRouter.get("/topKeys",adminAuth,analyticController.getTopKeysController)

module.exports=analyticRouter