const express=require('express')
const analyticRouter=express.Router()

const analyticController=require("../controllers/analytics.controller")

analyticRouter.get("/overview",analyticController.getAnalyticsOverviewController)
module.exports=analyticRouter