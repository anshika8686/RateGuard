const express=require('express')
const app=express()
app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json({
        message: "RateGuard Backend is running"
    });
});


const dataRouter=require("./routes/data.routes")
app.use("/api",dataRouter)

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"RateGuard Backend is running"
    })
})

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend is healthy"
    });
});

module.exports=app