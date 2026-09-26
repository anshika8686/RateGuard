const express=require("express");
const connectToDb = require("./config/mongoose");
const app=express()
app.use(express.json())

connectToDb()

const apikeyRouter=require('../src/routes/apikey.route')
app.use('/api',apikeyRouter)

app.get("/", (req, res) => {
    res.status(200).json({
        message: "FluxGate Gateway is running"
    });
});
module.exports=app
