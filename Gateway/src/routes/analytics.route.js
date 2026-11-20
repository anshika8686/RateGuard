const express=require('express')
const analyticRouter=express.Router()

const analyticController=require("../controllers/analytics.controller")
const getRecentAnalyticController=require("../controllers/analytics.controller")

analyticRouter.get("/overview",analyticController.getAnalyticsOverviewController)
analyticRouter.get("/recent", analyticController.getRecentAnalyticsController)
module.exports=analyticRouter