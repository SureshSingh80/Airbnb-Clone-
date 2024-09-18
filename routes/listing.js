const express=require("express");
const router=express.Router();
const Listing=require("../Models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listing.js");
const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});


// index route 
router.get("/",listingController.index);


// add listing route 
router.get("/new",isLoggedIn,listingController.renderNewFrom);


router.post("/",validateListing,isLoggedIn,upload.single("listing[image]"),listingController.addNewListings);

// filters route
router.get("/filters/trending",listingController.filtersTreding);
router.get("/filters/rooms",listingController.filtersRooms);
router.get("/filters/iconicCity",listingController.filtersIconicCity);
router.get("/filters/moutains",listingController.filtersMountains);
router.get("/filters/castles",listingController.filtersCastles);
router.get("/filters/amazing",listingController.filtersAmazing);
router.get("/filters/camping",listingController.filtersCamping);
router.get("/filters/fams",listingController.filtersFams);
router.get("/filters/arctic",listingController.filtersArctic);
router.get("/filters/domes",listingController.filtersDomes);
router.get("/filters/boats",listingController.filtersBoats);
// show route
router.get("/:id",listingController.showListings);

// update route 
router.get("/:id/edit",isLoggedIn,isOwner,listingController.renderEditForm);

router.put("/:id",isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,listingController.updateListings); 

// delete route
router.delete("/:id",isLoggedIn,isOwner,listingController.destroyListings);  

router.post("/search",listingController.searchListings);



module.exports=router;