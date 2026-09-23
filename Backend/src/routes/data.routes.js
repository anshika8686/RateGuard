const express=require('express')
const  dataRouter=express.Router()
const dataController=require("../controllers/data.controller")

dataRouter.get("/data",dataController.getDataController)

module.exports=dataRouter