const express=require('express')
const apikeyRouter=express.Router()

const ApiKeyController=require("../controllers/apiKey.controller.js")
const identifyUser=require("../middleware/userAuth.middleware.js")

apikeyRouter.post('/createkeys',identifyUser,ApiKeyController.createApiKeyController)
apikeyRouter.get('/fetchkeys',identifyUser,ApiKeyController.fetchApiKeyController)
apikeyRouter.patch('/updatekeys/:id',identifyUser,ApiKeyController.updateApiKeyController)
apikeyRouter.delete('/deletekeys/:id',identifyUser,ApiKeyController.deleteApiKeyController)

//creation of api key
module.exports=apikeyRouter


