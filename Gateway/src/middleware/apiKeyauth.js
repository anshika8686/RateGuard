
const {hashApiKey}=require("../services/apiKey.service")
const ApiModel=require("../models/apiKey.model.js")

const apikeyAuth=async(req,res,next)=>{
    try{
        console.log("middleware hit")
        const apiKey=req.header("x-api-key")
        if(!apiKey){
            return res.status(400).json({
                success:false,
                message: "Field can't be empty. Please enter a valid apiKey."
            })
        }
        const hashApi=hashApiKey(apiKey)
        const client=await ApiModel.findOne({keyHash:hashApi})
        if(!client){
            return res.status(401).json({
                success:false,
                message: "ApiKey not found."
            })
        }

        if(!client.active){
            return res.status(401).json({
                success:false,
                message: "Api Key is not active."
            })

        }
        req.client=client
        next() //go to next controller

    }
    catch(error){
        return res.status(401).json({
            message:error
        })
    }
}
module.exports=apikeyAuth