import multer from "multer";
import * as path from 'path'
import User from "../models/userM.js";

// STORAGE

// var storage = multer.diskStorage({

//   // giving destination for storage of files (images,pdf,etc)
//   destination: function (req, file, callback) {
//     callback(null, './public/data');
//   },
//   // FILE NAME
//   filename: function (req, file, callback) {
//     console.log(file);
//     if (file.originalname.length > 6)
//       callback(null, file.fieldname + '-' + Date.now() + file.originalname.substr(file.originalname.length - 6, file.originalname.length));
//     else
//       callback(null, file.fieldname + '-' + Date.now() + file.originalname);

//   }
// });
// //  FILE FILTER 
// const fileFilter = (req, file, cb) => {
//   const fileTypes = /jpeg|jpg|png|gif|pdf|mp4|mp3/;
//   const mimeType = fileTypes.test(file.mimetype);
//   const extname = fileTypes.test(path.extname(file.originalname));

//   if (mimeType && extname) {
//     return cb(null, true);
//   }
//   return cb("give proper file formate to uplaod");
//   // return cb( new Error('I don\'t have a clue!'));
//   // cb(('Wrong extension type'), false);
//   // return cb(req.fileValidationError, false);
// }

// let upload = multer({ storage: storage, fileFilter: fileFilter })
// // const upload = multer({ storage: storage });

var storage = multer.diskStorage({


  destination: function(req, file, callback) {
      callback(null, './public/data');
    },
    filename: function(req, file, callback) {
      console.log(file);
      if(file.originalname.length>6)
        callback(null, file.fieldname + '-' + Date.now() + file.originalname.substr(file.originalname.length-6,file.originalname.length));
      else
        callback(null, file.fieldname + '-' + Date.now() + file.originalname);
  
    }
  });
  //  FILE FILTER 
const fileFilter= (req, file, cb) => {
const fileTypes = /jpeg|jpg|png|gif|pdf/;
const mimeType = fileTypes.test(file.mimetype);
const extname = fileTypes.test(path.extname(file.originalname));

if (mimeType && extname) {
return cb(null, true);
}
return cb("give proper file formate to uplaod");
// return cb( new Error('I don\'t have a clue!'));
// cb(('Wrong extension type'), false);
// return cb(req.fileValidationError, false);
}

let upload = multer({ storage: storage,fileFilter:fileFilter})
  // const upload = multer({ storage: storage });

export default upload