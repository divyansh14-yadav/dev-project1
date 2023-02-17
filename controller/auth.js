import express  from "express";
import User from "../models/authM.js";
import url from "../models/conn.js";
import Jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer';
import { v2 as cloudinary } from 'cloudinary'
import upload from "../middleware/image.js";
import * as path from 'path'
import multer from 'multer';

const authcontroller=express.Router();

// cloudnary image env 
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
})


// send mail
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
  host: "smtp.gmail.com",
    user: process.env.MAIL_USERNAME,   // gmail id
    pass: process.env.MAIL_PASSWORD,   
  }
});

// register api
const userRegister= async(req,res)=>{
  // if(!req.file)
  // {
  //     res.send("pls select the image")
  // }
  // else{
    const {username,email}=req.body

    const image = req.files.pp[0].path
    const identity = req.files.banner[0].path;

      const result = await cloudinary.uploader.upload(image)
      const results = await cloudinary.uploader.upload(identity)

       const hashedPassword = await bcrypt.hash(req.body.password,10);       
       const password=hashedPassword
       
     if(!username ||!email ||!password)
          {
              res.status(400).send("fields is required");
          }
          else{
           
               try {
      
          const users=new User({
            username,email,password,image:result.secure_url,identity:results.secure_url
          })
          
      console.log(users)
 
      let mailOptions = {
        from: process.env.MAIL_USERNAME,
        to:email,
        subject:'registration',
        text: 'user register successfully'
      };
      transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
          console.log("Error",err);
        } else {
          console.log("Email sent successfully");
        }
      });
          const data=await users.save()
        console.log(data)
          res.status(200).send({details:data})
      } catch (err) {
          res.status(400).send(err);
      }
  }
}
// }

// login api
const userLogin=async(req,res)=>{
    
     const {email,password}=req.body;

     if(!email || !password)
     {
        res.status(400).send("field is required");
     }
     else
     {
        try {
            
            // if user exist in the database check through email and password 
     
            const user= await User.findOne({email})
          if(!user)
          {
            res.status(400).send("invalid email or password")
          }
          else if (user && (await bcrypt.compare(password, user.password))) {
          const payload = {
        user: {
          id: user.id,
        },
      };
            // create token
              const token =Jwt.sign({user_id:user._id},
                process.env.API_SECRET_KEY,
                {
                    expiresIn:"24h"
                })
                
                user.token=token    // save the token
         
          // console.log(user._id);
            const login=await user.save()
          
            res.status(200).send({"id":user._id,token})
          }
          else
          {
            res.send("invalid email or password")
          }
        } catch (err) {
            res.status(400).send(err)
        }
     }
    
}

export default{ authcontroller ,userRegister ,userLogin}