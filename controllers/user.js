const User=require("../Models/user");

module.exports.renderSignupForm=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signUp=async(req,res,next)=>{
    try
    {
        let {username,email,password}=req.body;
        const newUser=new User({username,email});
        const registeredUser=await User.register(newUser,password);
        console.log(registeredUser);

        // automatic login after signup
         req.login(registeredUser,((err)=>{
            if(err){
                next(err);
            }
            else{
                req.flash("success","Welcome to wanderLust");
                res.redirect("/listings");
            }
         }));
         
    }
    catch(err){
       req.flash("error",err.message);
       res.redirect("/signup");
    }
     
}

module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login=(req,res)=>{
    req.flash("success","welcome back to wanderlust");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err)
            next(err);
        else 
           {
              req.flash("success","you are logged out !!");
              res.redirect("/listings");
           }
    });
}