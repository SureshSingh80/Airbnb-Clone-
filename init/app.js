const mongoose=require("mongoose");
const initData=require("./data.js");

const Listing=require("../Models/listing.js");

main().then((res)=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
});
async function main(){
     await mongoose.connect("mongodb+srv://Suresh-Singh:mongoAtlas12..@cluster0.f1z9fwi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
}
const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"665ddf65e52745f79487a402"}));
    await Listing.insertMany(initData.data);
    console.log("data was initilized");
}
initDB();