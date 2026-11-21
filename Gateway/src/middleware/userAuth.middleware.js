const jwt = require("jsonwebtoken");
function identifyUser(req,res,next){
    const token=req.cookies.token
    console.log("Printing token");
    console.log(token);
    if(!token){
        return res.status(401).json({
            message:"Unauthorised access"
        })
    }

    //VERIFYNG WHETHER THE USER WHO REQUESTED FOT THAT SERVICE IS AUTHORISED OR NOT
    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded token:", decoded);

    req.user = decoded;

    next();
} catch (err) {
    console.log("JWT Error:", err);

    return res.status(401).json({
        message: "User not authorised",
    });
}
    
  
}
module.exports=identifyUser