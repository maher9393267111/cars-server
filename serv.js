

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


const categoryRoutes = require("./routes/category");
const carRoutes = require("./routes/car");


// middlewares

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

// usee public folder

app.use(express.static(path.join(__dirname, "public")));



// routes use by make map to routes folder

app.use('/api/category', categoryRoutes);
app.use('/api/car', carRoutes);




//------------------------------------------------------




// connect to mongoose



mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
     
    })
    .then(() => console.log('DB Connected'));






//PORT 

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>{
    console.log('Server is running on port', PORT)
})