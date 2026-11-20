const express=require('express')
const analyticRouter=express.Router()

const analyticController=require("../controllers/analytics.controller")

analyticRouter.get("/overview",analyticController.getAnalyticsOverviewController)
analyticRouter.get("/recent", analyticController.getRecentAnalyticsController)
analyticRouter.get("/weekusage",analyticController.getWeekAnalyticsController)
analyticRouter.get("/topKeys",analyticController.getTopKeysController)

module.exports=analyticRouter