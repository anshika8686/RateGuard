const express=require("express");
const connectToDb = require("./config/mongoose");
const app=express()
app.use(express.json())

connectToDb()

app.get("/", (req, res) => {
    res.status(200).json({
        message: "FluxGate Gateway is running"
    });
});
module.exports=app
