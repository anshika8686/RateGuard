const mongoose=require('mongoose')
const requestLogSchema= new mongoose.Schema({
    clientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"apiModel",
    },
    endpoint:{
        type:String,
        required:true
    },
    method:{
        type:String,
        required:true
    },
    status_code:{
        type:Number,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    responseTime:{
        type:Number
    }
})
requestLogSchema.index(
    {createdAt:1},
    {expireAfterseconds: 30*24*60*60}
)
const RequestLogModel=mongoose.model("RequestLog",requestLogSchema)
module.exports=RequestLogModel
