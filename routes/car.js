const express = require("express");
const router = express.Router();
const {createCar,
    create2,
    create3,
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

const car3upload = upload.fields([ { name: "front_images", maxCount: 5 }, { name: "konsol_images", maxCount: 5 },]);





router.post("/add-car", uploadImages  ,createCar);



// add-prcctice 

 router.post("/add-car2", upload.array('carimages')  ,create2);



 router.post("/add-car3", car3upload,create3);




module.exports = router;