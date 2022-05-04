const carModel = require("../models/car");
const cloudinary = require("../helpers/cloudinary");
const categoryModel = require("../models/category");

const fs = require("fs");
const { query } = require("express");
// found     image by his array from cloudinary

// create car

exports.create4 = async (req, res) => {
  const folder = "cars4";

  const images = req.files;

  console.log(images);
  console.log(images.front_images.length);

  const {
    name,
    satici_name,
    city,
    yakit_tipi,
    mesafe,
    category,

    price,
    tittle,
    description,
    car_id,
    maked_at,
    cat_name,
  } = req.body;
  // console.log(
  //   name,
  //   satici_name,
  //   city,
  //   yakit_tipi,
  //   mesafe,
  //   category,

  //   price,
  //   tittle,
  //   description,
  //   car_id,
  //   maked_at
  // );

  // find category by id

  console.log("category", category);

  // if category is mongodb id object show console.log(category.id) istrue

  const category_id = await categoryModel.findById(category);

  console.log("category_id---------------------------->", category_id);

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
    satici_name,
    city,
    yakit_tipi,
    mesafe,
    category,
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

// delete car by id

exports.deleteCar = async (req, res) => {
  const id = req.params.id;

  const car = await carModel.findById(id);

  // delete car images from cloudinary

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

  //koltuk images  ------------------------------------------------------

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

  //konsole images  ------------------------------------------------------

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

  // delete car from database

  const deletedCar = await carModel.findByIdAndDelete(id);

  res.status(200).json({ message: "car deleted successfully", deletedCar });
};

console.log("car controllerhhhhh");

// search car by  category id

exports.searchCarByCategoryId = async (req, res) => {
  const category_id = req.params.id;
  console.log("category_id", category_id);

  // find only cars that have category_id

  const cars = await carModel.find({ category: category_id }).select("name");

  res.json({ cars });
};

// search car by  his name regex

exports.searchCarByName = async (req, res) => {
  const name = req.params.name;
  //console.log("name", name);

  // regex search name

  if (name) {
    const cars = await carModel
      .find({ name: { $regex: name, $options: "i" } })
      .select("name");
    res.json({ cars });
  }
};

// search from body

exports.searchCarBy = async (req, res) => {
  const body = req.body;

  if (body.name) {
    const cars = await carModel
      .find({ name: { $regex: body.name, $options: "i" } })
      .select("name price");
    res.json({ cars });
  }

  if (body.price) {
    // convert price to number

    const price = parseInt(body.price);
    console.log("price", price);

    // regex search price as a number

    const cars = await carModel

      .find({ price: { $eq: body.price } }) // $gt well show cars have greater than price

      .select("name price");

    res.json({ cars });
  }
};

// seach betwwen two price

exports.searchCarByPriceRange = async (req, res) => {
  const body = req.body;
  console.log("body", body);
  if (body.price_min && body.price_max) {
    const cars = await carModel
      .find({ price: { $gte: body.price_min, $lte: body.price_max } })
      .select("name price");
    res.json({ cars });
  }
};

// find all cars

exports.getAllCars = async (req, res) => {
  try {
    const cars = await carModel.find().select("name price maket_at");

    res.json({ cars });
  } catch (err) {
    console.log(err.message);
  }
};

// find car by make_at

exports.searchCarByMakeAt = async (req, res) => {
  const body = req.body;
  console.log("body", body);
  if (body.maked_at) {
    const cars = await carModel
      .find({ maked_at: { $gte: body.maked_at, $lte: body.maked_at } })
      .select("name price");
    res.json({ cars });
  }
};

// find car  by city

exports.searchCarByCity = async (req, res) => {
  const body = req.body;
  console.log("body", body);
  if (body.city) {
    const cars = await carModel
      .find({ city: { $regex: body.city, $options: "i" } })
      .select("name price city");
    res.json({ cars });
  }
};

// FIND CAR BY SEARCH METHOD MONGODB

exports.handleQuery = async (req, res) => {
  // req.query.query have array of query

  const searchQuery = req.query.search;

  const searchCity = req.query.city ? req.query.city : "city is null maher";

  console.log("searchcity", searchCity);




  

  console.log("searchQuery", searchQuery);

  // find by  $or

  const cars = await carModel
    .find({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { city: { $regex: searchQuery, $options: "i" } },
      ],
    })
    .select("name ");


// car must have city and name to be shown

//-------------- $and -------------------------- city and name must be there
// http://localhost:5000/api/car/search-car-by-query?search=ren&&city=istanbul

const carbyNameAndCity = await carModel.find({ $and : [{city : {$regex : searchCity, $options : "i"}}, {name : {$regex : searchQuery, $options : "i"}}]})



  res.json({ carbyNameAndCity });
};




exports.handleQuery = async (req, res) => {
  // req.query.query have array of query
  //  if req.query.query.city empty then find cars by name

  const searchQuery = req.query.search ? req.query.search : "";

  const searchCity = req.query.city ? req.query.city : "";

  console.log("searchcity", searchCity);

  // car must have city and name to be shown

  //-------------- $and -------------------------- city and name must be there
  // http://localhost:5000/api/car/search-car-by-query?search=ren&&city=istanbul

  const carbyNameAndCity = await carModel
    .find({
      $and: [
        { city: { $regex: searchCity, $options: "i" } },
        { name: { $regex: searchQuery, $options: "i" } },
      ],
    })
    .select("name city");

  res.json({ carbyNameAndCity });
};

// find by cat_name to car  hhhhhhhhhhh

exports.searchCarByArray = async (req, res) => {
  // we have array of checked checkboxes when checked send array of checked checkboxes

  const checked = req.body.checked;

  [""];

  console.log("checked", checked);

  // fin all cars then filtered by checked array

  const cars = await carModel.find().select("name price cat_name");

  // find only where checked array each item equal car.cat_name

  const filteredCars = cars.filter((car) => checked.includes(car.cat_name));

  const checkedFilter = cars.filter((car) => {
    car.cat_name === "fiat";
  });

  console.log("checkedFilter", filteredCars);

  res.json({ filteredCars });
};

//skip limit  paginate cars

exports.showCars = async (req, res) => {
  console.log("req.query.page", req.query);

  const skip = req.query.skip ? parseInt(req.query.skip) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;

  const cars = await carModel
    .find()
    .skip(skip)
    .limit(limit)
    .select("name price cat_name");

  res.json({ cars });
};

//{filter}

exports.findFilter = async (req, res) => {
  const filtering = {};

  //   const names =[]
  //   if (req.query.name) {

'maher branch'

  // // push names to array

  // names.push(req.query.name)
  // console.log(names)

  //   }

  const filtered = carModel.find(name);
  if (!filtered) {
    res.status(404).json({
      status: 404,
      message: "Products not found",
    });
  }
  res.status(200).json(filtered);
};



// find cars by category id


exports.findcarbyCatId = async (req, res) => {

  const cat_id = req.params.cat_id;

  console.log("cat_id", cat_id);

  const cars = await carModel.find({  cat_id: cat_id }).select("name price").populate('category', 'name');

  res.json({ cars });
}


//find cars by his id

exports.findCarById = async (req, res) => {
  const car_id = req.params.car_id;
  console.log("carrrrr_id", car_id);

  // check if car_id is integer

  if (isNaN(car_id)) {
console.log("isNaN", isNaN(car_id));
  }

  const car = await carModel.findById(car_id).select("name price");

  res.json({ car });
}





exports.findCarByNameAndCityAndPrice = async (req, res) => {

 // const body = req.body;

//  console.log("body", body);
const name = req.body.name ? req.body.name : "";
const city = req.body.city ? req.body.city : "";
const Min_price = req.body.min_price ? req.body.min_price : 0;
const Max_price = req.body.max_price ? req.body.max_price : 9000000;
console.log("name", name, "city", city, "price", Min_price);






    const cars = await carModel
      .find({
        $and: [
          { name: { $regex: name, $options: "i" } },
          { city: { $regex: city, $options: "i" } },
         { price: { $gte: Min_price, $lte: Max_price } },
        ],
      })
      .select("name price city");

    res.json({ cars });
  
}




