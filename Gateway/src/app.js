const express=require("express");
const connectToDb = require("./config/mongoose");
const connecttoredis=require("./config/redis.connect")
const cookieParser = require("cookie-parser");

const app=express()
app.use(express.json())

connectToDb()
connecttoredis()

app.use(cookieParser());
const apikeyRouter=require('../src/routes/apikey.route')
const proxyRouter=require("../src/routes/proxy.route")
const analyticRouter=require("../src/routes/analytics.route")
const authRouter=require("../src/routes/auth.route")

app.use('/api',apikeyRouter)
app.use('/api',proxyRouter)
app.use('/api/analytics',analyticRouter)
app.use('/api/auth',authRouter)

app.get("/", (req, res) => {
    res.status(200).json({
        message: "FluxGate Gateway is running"
    });
});
module.exports=app
