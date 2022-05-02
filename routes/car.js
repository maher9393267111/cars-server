const express = require("express");
const router = express.Router();
const {
    
    create4,
    update4,
    deleteCar,
    searchCarByCategoryId,
    searchCarByName,
    searchCarBy,
    searchCarByPriceRange ,
    getAllCars,
    searchCarByCity,
    handleQuery,
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


// create car 32323



const car4upload = upload.fields([ { name: "front_images", maxCount: 5 }, { name: "back_images", maxCount: 5 },
{ name: "koltuk_images", maxCount: 5 },
{ name: "konsole_images", maxCount: 5 }


]);









 router.post("/add-car", car4upload,create4);


 router.put("/update-car4/:id", car4upload,update4);


    router.delete("/delete-car/:id", deleteCar);

// find car by category id

router.get("/search-car-by-category-id/:id", searchCarByCategoryId);



// find car by name in body name or price body

router.post("/search-car-by", searchCarBy);




// search by name params regex  
router.get("/search-car-by-name/:name ", searchCarByName);


//search by price range two parices

router.post("/search-car-by-price-range", searchCarByPriceRange);
//router.get("/search-car-by-price-range/:min/:max", searchCarByPriceRange);



// ger all cars

router.get("/get-all-cars", getAllCars);




// find cars by city
router.post("/search-car-by-city", searchCarByCity);

//router.get("/search-car-by-city/:city", searchCarByCity);





// search cars by query text method

router.post("/search-car-by-query", handleQuery);






module.exports = router;