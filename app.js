import express from 'express';
import * as path from 'path';
import indexrouter from './routes/index.js';
import upload from './middleware/image.js';

const app = express()

// middleware 
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join('./upload/images')));

// FOR MULTIPLE FILES IN FORM DATA WE USE UPLOAD.FIELDS
app.use(upload.fields([{
    name: 'pp', maxCount: 1
}, {
    name: 'banner', maxCount: 1
}]))

// router
app.use("/api", indexrouter)


app.listen(3000)

console.log("http://localhost:3000");


