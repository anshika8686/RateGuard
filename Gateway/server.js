require("dotenv").config()
const app=require('./src/app')
PORT=process.env.PORT||4000
app.listen(PORT,()=>{
    console.log(`Gateway Backend started running at ${PORT}`)
})