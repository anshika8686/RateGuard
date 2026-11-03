const {checkRateLimit}=require("../services/rateLimiter.service")
async function rateLimit(req,res,next){
    const result=await checkRateLimit(req.client)
    res.set("X-RateLimit-Limit", String(req.client.rateLimit));
    res.set("X-RateLimit-Remaining", String(result.remainingTokens));
    try{
        if(!result.allowed){
        return res.status(429).json({
            message:"Rate Limit exceeded",
            limit: req.client.rateLimit,
            remaining:result.remainingTokens
        })
    }
        next();
    }
    
    catch(error){
        console.log("Rate Limiter failed")
        return res.status(503).json({
            message: "Rate limiter temporarily unavailable"
        })
    }
}
module.exports=rateLimit