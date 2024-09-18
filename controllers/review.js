const Review=require("../Models/review");
const Listing=require("../Models/listing");

module.exports.postReviews=async(req,res,next)=>{
    try
    {
        let {id}=req.params;
        let listing=await Listing.findById(req.params.id);
        let newReview=new Review(req.body.review);
        newReview.author=req.user._id;
        listing.reviews.push(newReview);
        await newReview.save();
        await listing.save();
        console.log("new Review saved");
        req.flash("success","Review Added Successfully");
        res.redirect(`/listings/${id}`);
    }
    catch(err){
        next(err);
    }
    
}

module.exports.destroyReview=async(req,res,next)=>{
    try
    {
        let {id,reviewId}=req.params;
        await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
        await Review.findByIdAndDelete(reviewId);
        req.flash("success","Review Deleted Successfully");
        res.redirect(`/listings/${id}`);
        
    }
    catch(err){
        next(err);
    }
    

}