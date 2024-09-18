const Listing=require("./Models/listing");
const Review=require("./Models/review.js");
const {listingSchema,reviewSchema}=require("./schema.js");
const customError=require("./Utils/customerError.js");


module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        console.log(req.originalUrl);
        req.flash("error","you need to first logged in");
        return res.redirect("/login"); 
    }
    next();
};    
module.exports.saveRedirecturl=(req,res,next)=>{
     if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
     }
     next();
};
module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
         req.flash("error","you have not any authorization to perform this action");
         return res.redirect(`/listings/${id}`);
    }
    next();
}
module.exports.validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);  
    console.log("Error=",error);
    if(error){
       throw new customError(400,error);
    }
    else 
      next();
};

module.exports.validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);  
    console.log("Error",error);
    if(error){
       throw new customError(400,error);
    }
    else 
      next();
};

module.exports.isReviewAuthor=async(req,res,next)=>{
    let {id,reviewId}=req.params;
    let review=await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error","you are not author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}