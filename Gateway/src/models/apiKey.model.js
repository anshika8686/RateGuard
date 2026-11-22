const mongoose=require('mongoose')
const apikeySchema=new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required: true,
    },
    name:{
        type:String,
        required:true
    },
    keyHash: {
        type: String,
        required: true,
        unique: true
    },

    keyPrefix: {
        type: String,
        required: true
    },

    rateLimit: {
        type: Number,
        required: true
    },

    active: {
        type: Boolean,
        default: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const apiModel=mongoose.model("ApiKey",apikeySchema);
module.exports = apiModel