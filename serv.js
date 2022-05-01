console.log('Hello da');

const path = require('path')
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();

// app
const    app = express()


// routes paths





// middlewares

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

// usee public folder

app.use(express.static(path.join(__dirname, "public")));



// routes use by make map to routes folder



//------------------------------------------------------




// connect to mongoose



mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
     
    })
    .then(() => console.log('DB Connected'));






//PORT 

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>{
    console.log('Server is running on port', PORT)
})