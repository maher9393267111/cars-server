const express = require("express");
const router = express.Router();
const {CreateCategory} = require("../controllers/category");
const multer = require("multer");
//const { loginCheck } = require("../middleware/auth");

// Image Upload setting
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/category");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });


router.post("/add-category",  upload.single("image"), CreateCategory);



module.exports = router;