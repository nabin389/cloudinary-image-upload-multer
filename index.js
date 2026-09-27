// const express = require("express");
// require('dotenv').config();
// const multer  = require('multer')
// // generate random number
// const {v4:uuidv4} = require('uuid')
// // import { v2 as cloudinary } from 'cloudinary';
// const cloudinary = require("cloudinary").v2; // means using second version
// require("dotenv").config();
// const fs = require('fs');
// const { default: mongoose } = require("mongoose");

// // server create
// const app = express();
// app.use(express.json());

// // first file moves on upload and then claudinary and then delete from upload then claudinary provide rel
// // cloudinary first
// cloudinary.config({
//         cloud_name: process.env.cloud_name,
//         api_key: process.env.API_KEY,
//         api_secret: process.env.API_SECRET
//          // Click 'View API Keys' above to copy your API secret
//     });

// // multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads')
//   },
//   filename: function (req, file, cb) {
//     console.log("inside filename function ", file);

//     // brfore
//     // const uniqueSuffix = Date.now()+'-'+Math.round(Math.random()*1E9)
//     // cb(null, file.fieldname + '-' + uniqueSuffix)
//     const random=uuidv4();
//     cb(null, random+""+file.originalname)
//     console.log(file.originalname)
//     }
// })

// // before storage
// // const upload = multer({ dest: './uploads' })
// const upload = multer({ storage: storage })

// // database connection
// require('./db/db.js');

// // create schema
// // returns class
// const Image = mongoose.model('Image', { Image_Url: String });
// // make objects

// app.post('/', upload.single('myfile'), async (req, res)=>{
//   // cloudinary second thats it
//    const x = await cloudinary.uploader.upload(req.file.path)
//    console.log("this is x: ", x); // take url from here

//   //  here create object (this is mongodb object)
//   const newvar = new Image({ Image_Url: x.secure_url });
//   newvar.save().then(()=> console.log("completed"));

//   //  now delete from upload folder
//   fs.unlink(req.file.path,(err => {
//         if (err) console.log(err);
//         else {
//             console.log("\nDeleted file");
//         }
//     }));

//    return res.json({
//         message: "file uploaded",
//         you_url: {image_url:x.secure_url},
//         file: req.file.path
//     })
// })

// let port = process.env.PORT || 3000
// app.listen(port, ()=>{
//     console.log("Server is running on port 3000");
// });

// now revising everyting
// everything is in this single page 
// you have to manually delete from claudinary
const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { v2: cloudinary } = require("cloudinary");
const fs = require('fs');
const { default: mongoose } = require("mongoose");


// database connection
require('./db/db.js');

// after
// class created
const Image = mongoose.model('Image', { Image_Url: String });



// cloudinary configuration
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  // Click 'View API Keys' above to copy your API secret
});


// for multer for file storate
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
        console.log("call this store");
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    console.log("call this filename");
    const random = uuidv4();
    cb(null, random + "-" + file.originalname);
    console.log("file name is: ");
    console.log(file.originalname);
  },
});

const upload = multer({ storage: storage });

// multer

// before managing fileneme
// const upload = multer({ dest: 'uploads/' });


// route for sending image
app.post("/", upload.single("myfile"), async (req, res) => {
    console.log("inside request");
    // stores on cloudinary
  const uploadResult = await cloudinary.uploader.upload(req.file.path);
  console.log("after claudinary");
  console.log(uploadResult);

// then delete from our device 
  fs.unlink(req.file.path,(err)=>{
    if(err){
        console.log("Error occured: ", err)
    } else{
        console.log("Deleted file: ", req.file.path);
    }
  });

// then store on database
  const newvar = new Image({ Image_Url: uploadResult.secure_url });
  await newvar.save().then(()=> console.log("completed"));

// then send response
  res.json({
    message: "Hello world",
    file: req.file,
    claudinary: uploadResult
  });
});


// app is running here
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
