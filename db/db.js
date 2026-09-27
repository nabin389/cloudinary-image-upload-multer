const mongoose = require('mongoose')
require("dotenv").config();
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected to mongodb")
}).catch(()=>{
    console.log("Error");
}) 