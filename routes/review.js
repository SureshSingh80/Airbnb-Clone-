const express=require("express");
const {reviewSchema}=require("../schema.js");
const Review=require("../Models/review.js");
const customError=require("../Utils/customerError.js");
const Listing=require("../Models/listing.js");
const {isLoggedIn,validateReview,isReviewAuthor}=require("../middleware.js");
const router=express.Router({mergeParams:true});
const reviewControllers=require("../controllers/review.js");


//reviews (post route)
router.post("/",isLoggedIn,validateReview,reviewControllers.postReviews);


// review (delete route)
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,reviewControllers.destroyReview);
module.exports=router;
