import express from 'express';
import * as path from 'path';
import indexrouter from './routes/index.js';
import upload from './middleware/image.js';
import multer from 'multer';
import bodyParser from 'body-parser'

const index = express()

// middleware 
index.use(express.json());

index.use(express.urlencoded({ extended: true }));

index.use(express.static(path.join('./upload/images')));

// FOR MULTIPLE FILES IN FORM DATA WE USE UPLOAD.FIELDS
index.use(upload.fields([{
    name: 'pp', maxCount: 1
}, {
    name: 'banner', maxCount: 1
}]))

// router
index.use("/api/v1", indexrouter)


index.listen(3000)

console.log("http://localhost:3000");


