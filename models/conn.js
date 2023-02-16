import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const url=process.env.MONGO_DB


mongoose.set('strictQuery',true); // for mongoose warning remove

mongoose.connect(process.env.MONGO_DB)
.then(()=>{

    console.log("connected to mongodb");

}).catch(()=>{

    console.log("err");

})

export default url;