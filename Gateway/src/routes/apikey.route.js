const express=require('express')
const apikeyRouter=express.Router()

const ApiKeyController=require("../controllers/apiKey.controller.js")

apikeyRouter.post('/keys',ApiKeyController.createApiKeyController)
//creation of api key
module.exports=apikeyRouter


