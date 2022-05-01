const express = require("express");
const router = express.Router();
const {
    
    create4,
    // getAllCategory,
    // updateCategory,
    // deleteCategory,

} = require("../controllers/car");
const multer = require("multer");
//const { loginCheck } = require("../middleware/auth");

// Image Upload setting
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/cars");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });


// uplaod array of images with name and single image with name

const uploadImages = upload.fields([ { name: "ko_images", maxCount: 5 }, { name: "konsol_images", maxCount: 5 },


{ name: "front_images", maxCount: 5 } ,{name:'back_images',maxCount:5}


]);


// create car 3



const car4upload = upload.fields([ { name: "front_images", maxCount: 5 }, { name: "back_images", maxCount: 5 },
{ name: "koltuk_images", maxCount: 5 },
{ name: "konsole_images", maxCount: 5 }


]);








 router.post("/add-car4", car4upload,create4);


module.exports = router;