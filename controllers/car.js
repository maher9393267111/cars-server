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
      { folder: folder },
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
      { folder: folder },
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
      { folder: folder },
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
      { folder: folder },
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

// update car and images and remove old images from cloudinary

exports.update4 = async (req, res) => {
  const id = req.params.id;

  const folder = "cars4";

  const images = req.files;

  console.log(images);

  const { name, price, tittle, description, car_id, maked_at } = req.body;

  const front_Array = [];

  const back_Array = [];

  // find car by id and his old images from cloudinary and remove them

  const car = await carModel.findById(id);

  // front_images

  for (let i = 0; i < car.outside_images.front_images.length; i++) {
    const resp = await cloudinary.uploader.destroy(
      car.outside_images.front_images[i].public_id,
      (error, result) => {
        if (error) {
          console.log(error);
        }
        console.log("old front images deleted");
      }
    );
  }

  // back_images  ------------------------------------------------------

  for (let i = 0; i < car.outside_images.back_images.length; i++) {
    const resp = await cloudinary.uploader.destroy(
      car.outside_images.back_images[i].public_id,
      (error, result) => {
        if (error) {
          console.log(error);
        }
        //   console.log("resuuuuuuuult", result);
        console.log("old back images deleted");
      }
    );
  }

  // end back images  ------------------------------------------------------

  // koltuk images  ------------------------------------------------------

  const koltuk_Array = [];

  const konsole_Array = [];

  for (let i = 0; i < car.inside_images.koltuk_images.length; i++) {
    const resp = await cloudinary.uploader.destroy(
      car.inside_images.koltuk_images[i].public_id,

      (error, result) => {
        if (error) {
          console.log(error);
        }
        //   console.log("resuuuuuuuult", result);
        console.log("old koltuk images deleted");
      }
    );
  }

  //koltuk images end  ------------------------------------------------------

  // konsole images  ------------------------------------------------------

  // delete old konsole images from cloudinary

  console.log(
    car.inside_images.konsole_images,
    "car.inside_images.konsole_images"
  );

  for (let i = 0; i < car.inside_images.konsole_images.length; i++) {
    const resp = await cloudinary.uploader.destroy(
      car.inside_images.konsole_images[i].public_id,

      (error, result) => {
        if (error) {
          console.log(error);
        }

        console.log("old konsole images deleted");
      }
    );
  }

  // konsole images end  ------------------------------------------------------

  // ===========update car images and save new images in cloudinary

  // front_images

  console.log(
    car.inside_images.koltuk_images,
    "car.inside_images.koltuk_images"
  );

  for (let i = 0; i < req.files.front_images.length; i++) {
    console.log(i + "front_images looop -->", req.files.front_images[i]);

    const resp = await cloudinary.uploader.upload(
      req.files.front_images[i].path,

      //{ use_filename: true, unique_filename: false },
      { folder: folder },
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

  // back_images update  ------------------------------------------------------

  for (let i = 0; i < req.files.back_images.length; i++) {
    console.log(i + "front_images looop -->", req.files.back_images[i]);

    const resp = await cloudinary.uploader.upload(
      req.files.back_images[i].path,

      //  { use_filename: true, unique_filename: false },
      { folder: folder },
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

  // konsole images update ------------------------------------------------------

  for (let i = 0; i < req.files.konsole_images.length; i++) {
    console.log(i + "front_images looop -->", req.files.konsole_images[i]);

    const resp = await cloudinary.uploader.upload(
      req.files.konsole_images[i].path,

      //  { use_filename: true, unique_filename: false },
      { folder: folder },
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

  // koltuk images update ------------------------------------------------------

  for (let i = 0; i < req.files.koltuk_images.length; i++) {
    console.log(i + "front_images looop -->", req.files.koltuk_images[i]);

    const resp = await cloudinary.uploader.upload(
      req.files.koltuk_images[i].path,

      //   { use_filename: true, unique_filename: false },
      { folder: folder },
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

  const newDta = {
    name,

    price,

    tittle,

    description,

    maked_at,

    outside_images: { front_images: front_Array, back_images: back_Array },
    inside_images: {
      koltuk_images: koltuk_Array,
      konsole_images: konsole_Array,
    },
  };

  // updaate car in database

  const updatedCar = await carModel.findByIdAndUpdate(car._id, newDta, {
    new: true,
  });

  // car after update

  const carAfterUpdate = await carModel.findById(car._id);

  res.json({ message: "car updated successfully", carAfterUpdate });
};
