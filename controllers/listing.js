const Listing=require("../Models/listing");
const { all } = require("../routes/listing");

module.exports.index=async(req,res,next)=>{
    try
    {
        let allListings=await Listing.find({});
        res.render("listings/index.ejs",{allListings});
    }
    catch(err){
        next(err);
    }
    
    
}

module.exports.renderNewFrom=(req,res)=>{
    // show logged in user info
    console.log(req.user);

    res.render("listings/new.ejs");
      
    
}

module.exports.addNewListings=async(req,res,next)=>{
    try
    {
        let url=req.file.path;
        let filename=req.file.filename;
        // one way to extract data from any form
        // let {title,desctiption,image,price,coutry,location}=req,body;

        // another way
       
        let listing=req.body.listing;
        let newListing=new Listing(listing);
        newListing.owner=req.user._id;
        newListing.image={url,filename};
        await newListing.save();
        req.flash("success","New Listing Added Successfully");
        res.redirect("/listings");
        
    }
    catch(err)
    {
        next(err);
    }
    
}

module.exports.showListings=async(req,res,next)=>{
    try
    {
        let {id}=req.params;
        let listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"},}).populate("owner");
        console.log(res.locals.currUser);  
        if(!listing){
            console.log("list not found");
            req.flash("error","listing you requested doesn't exist");
            res.redirect("/listings");
        }
        res.render("listings/show.ejs",{listing});
    }
    catch(err)
    {
        next(err);
    }
    
}

module.exports.renderEditForm=async(req,res,next)=>{
    try
    {
        let {id}=req.params;
        let listing=await Listing.findById(id);
        if(!listing){
            console.log("list not found");
            req.flash("error","listing you requested doesn't exist");
            res.redirect("/listings");
        }
        let originalImageUrl=listing.image.url;
        originalImageUrl=originalImageUrl.replace("/upload","/upload/w_200");
        res.render("listings/edit.ejs",{listing,originalImageUrl});
    }
    catch(err){
        next(err);
    }
    
}

module.exports.updateListings=async(req,res,next)=>{
    try
    {
        
        let {id}=req.params;
        let listing=req.body.listing;
        console.log(listing);
        let newListing=await Listing.findByIdAndUpdate(id,listing);
        console.log("new listing is",newListing);
         if(typeof req.file !== "undefined"){ // to check our image is changed or not (check undefined)
            let url=req.file.path;
            let filename=req.file.filename;
            newListing.image={url,filename};
            await newListing.save();
         }

        req.flash("success","Listing Updated Successfully");
        res.redirect(`/listings/${id}`);
    }
    catch(err){
        next(err);
    }
    

}

module.exports.destroyListings=async(req,res)=>{
    try
    {
        let {id}=req.params;
        let deletedListing=await Listing.findByIdAndDelete(id);
        res.redirect("/listings");
        
    }
    catch(err){
        next(err);
    }
   
}
module.exports.searchListings=async(req,res,next)=>{
      try
      {
          let location=req.body.location;
          let allListings=await Listing.find({location:location});
          
          res.render("listings/index.ejs",{allListings});
      }
      catch(err){
        next(err);
      }
}
module.exports.filtersTreding=async(req,res,next)=>{
    try
    {
        let allListings=await Listing.find({category:"trending"});
        console.log(allListings);
        res.render("listings/index.ejs",{allListings});
    }
    catch(err){
        next(err);
    }
}
module.exports.filtersRooms=async(req,res,next)=>{
    try
    {
        let allListings=await Listing.find({category:"rooms"});
        res.render("listings/index.ejs",{allListings});
    }
    catch(err){
        next(err);
    }
}
module.exports.filtersIconicCity=async(req,res,next)=>{
    try
    {
        let allListings=await Listing.find({category:"iconicCity"});
        res.render("listings/index.ejs",{allListings});
    }
    catch(err){
        next(err);
    }
}
module.exports.filtersTreding=async(req,res,next)=>{
    try
    {
        let allListings=await Listing.find({category:"trending"});
        res.render("listings/index.ejs",{allListings});
    }
    catch(err){
        next(err);
    }
}
module.exports.filtersMountains=async(req,res,next)=>{
    try
    {
        let allListings=await Listing.find({category:"mountains"});
        res.render("listings/index.ejs",{allListings});
    }
    catch(err){
        next(err);
    }
}
module.exports.filtersCastles=async(req,res,next)=>{
    try
    {
        let allListings=await Listing.find({category:"castles"});
        res.render("listings/index.ejs",{allListings});
    }
    catch(err){
        next(err);
    }
}
module.exports.filtersAmazing=async(req,res,next)=>{
    try
    {
        let allListings=await Listing.find({category:"amazing"});
        res.render("listings/index.ejs",{allListings});
    }
    catch(err){
        next(err);
    }
}
module.exports.filtersCamping=async(req,res,next)=>{
    try
    {
        let allListings=await Listing.find({category:"camping"});
        res.render("listings/index.ejs",{allListings});
    }
    catch(err){
        next(err);
    }
}
module.exports.filtersFams=async(req,res,next)=>{
    try
    {
        let allListings=await Listing.find({category:"fams"});
        res.render("listings/index.ejs",{allListings});
    }
    catch(err){
        next(err);
    }
}
module.exports.filtersArctic=async(req,res,next)=>{
    try
    {
        let allListings=await Listing.find({category:"arctic"});
        res.render("listings/index.ejs",{allListings});
    }
    catch(err){
        next(err);
    }
}
module.exports.filtersDomes=async(req,res,next)=>{
    try
    {
        let allListings=await Listing.find({category:"domes"});
        res.render("listings/index.ejs",{allListings});
    }
    catch(err){
        next(err);
    }
}
module.exports.filtersBoats=async(req,res,next)=>{
    try
    {
        let allListings=await Listing.find({category:"boats"});
        res.render("listings/index.ejs",{allListings});
    }
    catch(err){
        next(err);
    }
}