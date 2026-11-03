const express=require("express");
const connectToDb = require("./config/mongoose");
const connecttoredis=require("./config/redis.connect")
const app=express()
app.use(express.json())

connectToDb()
connecttoredis()

const apikeyRouter=require('../src/routes/apikey.route')
const proxyRouter=require("../src/routes/proxy.route")

app.use('/api',apikeyRouter)
app.use('/api',proxyRouter)

app.get("/", (req, res) => {
    res.status(200).json({
        message: "FluxGate Gateway is running"
    });
});
module.exports=app
