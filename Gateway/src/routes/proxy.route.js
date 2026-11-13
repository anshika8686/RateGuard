const express=require('express')
const proxyRouter=express.Router()

const apikeyAuth=require("../middleware/apiKeyauth")
const rateLimit=require("../middleware/rateLimit.middleware")

const proxyController=require("../controllers/proxy.controller")

// proxyRouter.get("/test",apikeyAuth,rateLimit,(req,res)=>{
//     res.status(200).json({
//         message:"Request Successful",
//         client: req.client.name,
//         rateLimit: req.client.rateLimit

//     })
// })

proxyRouter.get("/data",apikeyAuth,rateLimit,proxyController)
module.exports=proxyRouter
