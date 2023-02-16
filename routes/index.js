import express from "express";
import usercontoller from "../controller/user.js";
import authcontoller from '../controller/auth.js'
import verifytoken from "../middleware/auth.js";

const indexrouter = express.Router();

// crud operation   

// CREATE DATA GET DATA GET BY ID DATA UPDATE DATA DELETE DATA  

indexrouter.post("/post", verifytoken, usercontoller.userpost);

indexrouter.get("/get", verifytoken, usercontoller.userget);

indexrouter.get("/getall/:id", verifytoken, usercontoller.usergetone);

indexrouter.put("/update/:id", verifytoken, usercontoller.userput);

indexrouter.delete("/delete/:id", verifytoken, usercontoller.userdelete);


// register and login

indexrouter.post("/register", authcontoller.userRegister);

indexrouter.post("/login", authcontoller.userLogin);


export default indexrouter