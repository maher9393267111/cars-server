const carModel = require("../models/car");
const cloudinary = require("../helpers/cloudinary");

const fs = require("fs");
// found     image by his array from cloudinary

// create car

exports.createCar = async (req, res) => {
  const folder = "cars";

  const { name, price, tittle, description, car_id, maked_at } = req.body;

  console.log(req.body);

  // section image

  const images = req.files;
  //console.log(images);

  const ko_images2 = images.ko_images.map((image) => {
    return image.path;
  });

  console.log("ko images--->", ko_images2);

  // send ko_images2 by for loop to cloudinary
  const ko_Array = [];

  ko_images2.forEach(async (image) => {
    const result = await cloudinary.uploader.upload(image, { folder: folder });

    // console.log(result);

    ko_Array.push({
      secure_url: result.secure_url,
      public_id: result.public_id,
    });

    console.log("ko_Array", ko_Array);
  });

  // find   seccure_url and public_id for ko_images2 for each image

  // konsol images  ------------------------------------------------------

  const konsol_images2 = images.konsol_images.map((image) => {
    return image.path;
  });

  console.log("konsol images999999999--->", konsol_images2);

  // send ko_images2 by for loop to cloudinary

  const konsole_object = {};
  const konsol_Array = [];
  konsol_images2.forEach(async (image) => {
    const result = await cloudinary.uploader.upload(image, { folder: folder });

    // console.log(result);

    konsole_object.secure_url = result.secure_url;
    konsole_object.public_id = result.public_id;

    konsol_Array.push(konsole_object);

    // konsole_Array.push({secure_url:result.secure_url,public_id:result.public_id});
    console.log("konsole_OOOOOOOOOOOOOBJECT", konsole_object);
  });

  // kosection images End  ------------------------------------------------------

  // front images  ------------------------------------------------------

  const front_images2 = images.front_images.map((image) => {
    return image.path;
  });

  //console.log("front images--->", front_images2);

  // send ko_images2 by for loop to cloudinary
  const front_Array = [];
  front_images2.forEach(async (image) => {
    const result = await cloudinary.uploader.upload(image, { folder: folder });

    //console.log(result);
    front_Array.push({
      secure_url: result.secure_url,
      public_id: result.public_id,
    });
    console.log("front_Array", front_Array);
  });

  // end front images  ------------------------------------------------------

  // check all ko_Array objects to set in car ko_images

  const ko_images = ko_Array.map((image) => {
    return {
      secure_url: image.secure_url,

      public_id: image.public_id,
    };
  });

  console.log("ko_images", ko_images);

  // checke ko_Array objects to set in car konsol_images

  const konsol_images = konsol_Array.map((image) => {
    return {
      secure_url: image.secure_url,

      public_id: image.public_id,
    };
  });

  // back images  ------------------------------------------------------

  const back_images2 = images.back_images.map((image) => {
    return image.path;
  });

  const back_Array = [];
  back_images2.forEach(async (image) => {
    const result = await cloudinary.uploader.upload(image, { folder: folder });

    // console.log(result);
    back_Array.push({
      secure_url: result.secure_url,
      public_id: result.public_id,
    });
  });

  // end back images  ------------------------------------------------------

  const newData = {
    name,
    price,
    tittle,
    description,
    car_id,
    maked_at,
    inside_images: [{ secure_url: "hello", public_id: "hello" }],
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

        data: data,
      });
    }
  });
};

// function for found image secure_url and public_id



exports.create2 = async(req,res) => {

    const folder = "cars";

    const images = req.files;
    console.log(images.length,images);

    const {name,price,tittle,description,car_id,maked_at} = req.body;

    const car_Array = [];

    for (let i = 0; i < req.files.length; i++) {
         console.log(i);
      
        const resp = await cloudinary.uploader.upload(
          req.files[i].path,
          { use_filename: true, unique_filename: false },
            (error, result) => {
if (error) {
  console.log(error);
}
                console.log(result);
                car_Array.push({
                    secure_url: result.secure_url,
                    public_id: result.public_id,
                });
            }
        );
        // console.log(resp);
        fs.unlinkSync(req.files[i].path);
     //   car_Array.push(resp.secure_url);
        console.log('---------->',car_Array);
      }


const newData = {

    name,
    price,
    tittle,
    description,
    car_id,
    maked_at,
    inside_images: car_Array,  // car_Array is array inside it object inside it secure_url and public_id
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
                data: data,
            });
        }
    }

    );



}