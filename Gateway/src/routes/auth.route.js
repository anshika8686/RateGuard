console.log("Auth routes loaded");
const express=require("express")
const authRouter=express.Router();

const authController=require("../controllers/auth.controller");
const identifyUser = require("../middleware/userAuth.middleware");

authRouter.post("/login",authController.loginController);
authRouter.post("/signup",authController.signupController);

authRouter.post("/logout",identifyUser,authController.logoutController);
authRouter.get("/get-me",identifyUser,authController.getmeController)

module.exports=authRouter