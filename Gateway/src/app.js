const express=require("express");
const connectToDb = require("./config/mongoose");
const connecttoredis=require("./config/redis.connect")
const app=express()
app.use(express.json())

connectToDb()
connecttoredis()

const apikeyRouter=require('../src/routes/apikey.route')
app.use('/api',apikeyRouter)

app.get("/", (req, res) => {
    res.status(200).json({
        message: "FluxGate Gateway is running"
    });
});
module.exports=app
