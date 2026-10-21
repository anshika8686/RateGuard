const fs=require("fs")
const path=require("path")
const redisClient=require("../config/redis.client");

const scriptPath=path.join(__dirname,
    "..",
    "scripts",
    "tokenBucket.lua"
); //reads the script and tells whether the request is allowed or not

const tokenBucketScript = fs.readFileSync(scriptPath, "utf8");
async function checkRateLimit(client) {
    const capacity=client.rateLimit;
    const refillRate=capacity/60;
    const now= Date.now()

    const ttl=Math.ceil(capacity / refillRate) * 2;
    const bucketKey=`bucket:${client._id}`;

    const result=await redisClient.eval(tokenBucketScript,{
        keys: [bucketKey],
        arguments:[
            String(capacity),
            String(refillRate),
            String(now),
            String(ttl)
        ]
    });

    return {
        allowed: Number(result[0]) === 1,
        remainingTokens: Number(result[1])
    };
}

module.exports = { checkRateLimit };