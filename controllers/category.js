const categoyModel = require("../models/category");
const cloudinary = require("../helpers/cloudinary");

//const cloudinary = require('cloudinary').v2;
//cereate category

exports.CreateCategory = async (req, res) => {
  const { name } = req.body;

  // section image

  const imageinfo = req.file;
  console.log(imageinfo);

  const image = req.file.path;
  console.log("image--->", image);
  console.log("req.body--->", req.body.name);

  // cloudinary

  const result = await cloudinary.uploader.upload(image);

  console.log("setion image------>", result.secure_url);

  const imagedata = {
    secure_url: result.secure_url,
    public_id: result.public_id,
  };

  console.log("imagedata------->", imagedata);

  const newcat = new categoyModel({
    name: name,
    image: imagedata,
  });

  try {
    await newcat.save();

    res.status(201).json(newcat);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};




//get all category

exports.getAllCategory = async (req, res) => {

    try {
        const allCategory = await categoyModel.find();
    
        res.status(200).json(allCategory);

    }

    catch (error) {
      res.status(409).json({ message: error.message });
    }

   




    }


