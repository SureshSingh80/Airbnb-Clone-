const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js");
const User=require("./user.js");

const listingSchema=Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String
    },
    image:{
       url:String,
       filename:String,
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"

    },
    category:{
        type:String,
        enum:["trending","rooms","iconicCity","mountains","castles","amazing","camping","fams","arctic","domes","boats"]
    }
   

});


// post middleware for deletion
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;