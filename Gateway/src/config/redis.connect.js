const redisclient=require('./redis.client')
async function connecttoredis(){
try{
    await redisclient.connect()
    .then(async()=>{
        console.log("Redis Connected");
    })
}
catch(error){
      console.error("Redis connection failed:", error);

}
}
module.exports=connecttoredis