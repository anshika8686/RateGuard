async function adminAuth(req,res,next){
const adminSecretKey= req.headers["x-admin-key"]
console.log("Received headers:", req.headers);
console.log("Admin key:", req.headers["x-admin-key"]);
if(!adminSecretKey){
    return res.status(401).json({
        success:false,
        message:"Admin key required"
    })
}

if(adminSecretKey!==process.env.ADMIN_API_KEY){
    return res.status(401).json({
        success:false,
        message:"Invalid Admin secret key "
    })
}

next();
}

module.exports=adminAuth