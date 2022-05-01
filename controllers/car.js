const carModel = require("../models/car");
const cloudinary = require("../helpers/cloudinary");

const fs = require("fs");
// found     image by his array from cloudinary

// create car

exports.create4 = async (req, res) => {
  const folder = "cars4";

  const images = req.files;

  console.log(images);
  console.log(images.front_images.length);

  const { name, price, tittle, description, car_id, maked_at } = req.body;
  console.log(name, price, tittle, description, car_id, maked_at);

  const front_Array = [];
  const back_Array = [];

  // front_images

  for (let i = 0; i < req.files.front_images.length; i++) {
    console.log(i + "front_images looop -->", req.files.front_images[i]);

    const resp = await cloudinary.uploader.upload(
      req.files.front_images[i].path,
      
      //{ use_filename: true, unique_filename: false },
      {folder:folder},
      (error, result) => {
        if (error) {
          console.log(error);
        }
        //  console.log("resuuuuuuuult", result);
        front_Array.push({
          secure_url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );
  }

  // back_images  ------------------------------------------------------

  for (let i = 0; i < req.files.back_images.length; i++) {
    console.log(i + "front_images looop -->", req.files.back_images[i]);

    const resp = await cloudinary.uploader.upload(
      req.files.back_images[i].path,
  
    //  { use_filename: true, unique_filename: false },
      {folder:folder},
      (error, result) => {
        if (error) {
          console.log(error);
        }
        //   console.log("resuuuuuuuult", result);
        back_Array.push({
          secure_url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );
  }

  // end back images  ------------------------------------------------------

  // koltuk images  ------------------------------------------------------

  const koltuk_Array = [];

  for (let i = 0; i < req.files.koltuk_images.length; i++) {
    console.log(i + "front_images looop -->", req.files.koltuk_images[i]);

    const resp = await cloudinary.uploader.upload(
      req.files.koltuk_images[i].path,
     
   //   { use_filename: true, unique_filename: false },
      {folder:folder},
      (error, result) => {
        if (error) {
          console.log(error);
        }
        //   console.log("resuuuuuuuult", result);
        koltuk_Array.push({
          secure_url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );
  }

  //koltuk images end  ------------------------------------------------------

  // konsole images  ------------------------------------------------------

  const konsole_Array = [];

  for (let i = 0; i < req.files.konsole_images.length; i++) {
    console.log(i + "front_images looop -->", req.files.konsole_images[i]);

    const resp = await cloudinary.uploader.upload(
      req.files.konsole_images[i].path,
      
    //  { use_filename: true, unique_filename: false },
      {folder:folder},
      (error, result) => {
        if (error) {
          console.log(error);
        }
        //   console.log("resuuuuuuuult", result);
        konsole_Array.push({
          secure_url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );
  }

  // konsole images end  ------------------------------------------------------

  console.log("car_Array", "------------------->", back_Array);

  const newData = {
    name,
    price,
    tittle,
    description,
    car_id,
    maked_at,
    inside_images: {
      koltuk_images: koltuk_Array,
      konsole_images: konsole_Array,
    },
    outside_images: { front_images: front_Array, back_images: back_Array },
  };

  // save newData in database

  const newCar = new carModel(newData);

  newCar.save((err, data) => {
    if (err) {
      res.json({
        success: false,
        message: "car not created",
        error: err,
      });
    } else {
      res.json({
        success: true,
        message: "car created",
        data,
      });
    }
  });
};
