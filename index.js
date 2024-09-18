if(process.env.NODE_ENV!="production"){
    require("dotenv").config();
}
console.log(process.env.SECRET);

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const customError=require("./Utils/customerError.js");
const session=require("express-session");
const MongoStore=require("connect-mongo");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./Models/user.js");
const flash=require("connect-flash");

// routers
const listings=require("./routes/listing.js");
const reviews=require("./routes/review.js");
const user=require("./routes/user.js");

// for local database
const mongoURL="mongodb://127.0.0.1:27017/wanderlust";

// for Atlas(Cloud) database
const atlasUrl=process.env.ATLASDB_URL;

// connnection with database
main().then((res)=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
});
async function main(){
     await mongoose.connect(atlasUrl);
}
app.listen(8080,()=>{
    console.log("server is listening at port 8080");
});

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views")); 





// use session

const store=MongoStore.create({
    mongoUrl:atlasUrl,
    crypto:{
       secret:process.env.SECRET,

    },
    touchAfter:24*60*60,
});

store.on("error",()=>{
    console.log("ERROR IN MONGO SESSION STORE",err);
});

const sessionOption={
      store:store,
      secret:process.env.SECRET,
      resave:false,
      saveuninitialized:true,
      cookie:{
        expires:Date.now() + 7 * 24 * 60 * 60 *1000,
        maxAge:Date.now() + 7 * 24 * 60 * 60 *1000,
        httpOnly:true,
      }
}



app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"public")));
app.engine("ejs",ejsMate);

// routes
// app.get("/",(req,res)=>{
//     res.send("Hii, I am root");
    
// });

// app.get("/demoUser",async (req,res)=>{
//         let fakeUser=new User({
//             email:"anonymous@gmail.com",
//             username:"unknown boy",
//         });
//         let registeredUser=await User.register(fakeUser,"Mypassword");
//         res.send(registeredUser);
// });


app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
});


app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);
app.use("/",user);

// app.post("/search",(req,res)=>{
//    let city=req.body.city;
//    res.send(city);
    
// });

//page not found 
app.all("*",(req,res,next)=>{
    next(new customError(404,"Page  not found"));
});

// error handling middleware
app.use((err,req,res,next)=>{
    console.log("-------ERROR----------");
    console.log(err.name);
    let {status=500,message="Some Error Occured"}=err;  
    // res.status(status).send(message);
    res.status(status).render("listings/error.ejs",{message}); 
});



