const express=require("express");
const User=require("../Models/user.js");
const passport=require("passport");
const { saveRedirecturl } = require("../middleware.js");
const router=express.Router({mergeParams:true});
const userController=require("../controllers/user.js");

// signup Process
router.get("/signup",userController.renderSignupForm);

router.post("/signup",userController.signUp);

// login process
router.get("/login",userController.renderLoginForm);

router.post("/login",saveRedirecturl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),userController.login);

// logout process
router.get("/logout",userController.logout);


module.exports=router;