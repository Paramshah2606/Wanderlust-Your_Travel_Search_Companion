const User=require("../models/user");

module.exports.renderindexpage=(req,res)=>{
    try{
        res.redirect("/listings");
    }catch(e){
        req.flash("error",e.message);
    }
}

module.exports.falseurl=(req,res)=>{
    try{
        res.redirect("/listings");
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/listings");
    }
}

//Render Sign up
module.exports.renderSignup=(req,res)=>{
    res.render("users/signup.ejs");
}

// Sign Up
module.exports.signup=async (req,res)=>{
    try{
        let {username,email,password}=req.body;
        let newUser=User({username,email});
        let registeredUser=await User.register(newUser,password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to StayScout");
            res.redirect("/listings");
        })
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}

// Render Login
module.exports.renderLogin=(req,res)=>{
    res.render("users/login.ejs");
};

// Login
module.exports.login=async (req,res)=>{
    req.flash("success","Welcome back to StayScout!");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

// Logout
module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are logged out..!");
        res.redirect("/listings");
    })
}
