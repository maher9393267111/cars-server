const categoyModel = require("../models/category");
const cloudinary = require("../helpers/cloudinary");

//const cloudinary = require('cloudinary').v2;
//cereate category

exports.CreateCategory = async (req, res) => {
  const { name } = req.body;

  // section image

  const imageinfo = req.file;

// upload image to cloudinary to category folder

const folder = 'category';

  console.log(imageinfo);

  const image = req.file.path;
  console.log("image--->", image);
  console.log("req.body--->", req.body.name);

  // cloudinary

  const result = await cloudinary.uploader.upload(image, { folder: folder });

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


// update category and remocve image from cloudinary and set new image to cloudinary

exports.updateCategory = async (req, res) => {

const id = req.params.id;

// fidn category by id then delete image from cloudinary

const category = await categoyModel.findById(id);

const oldCategoryImage = category.image.public_id;

const removeFromCloudinary = await cloudinary.uploader.destroy(oldCategoryImage);


    const { name } = req.body;
    console.log("name", name);

    const imageinfo = req.file;
    console.log('imageinfo ---->',imageinfo);

    const image = req.file.path;

    console.log('image path ---->',image);

    const result = await cloudinary.uploader.upload(image);

    const imagedata = { secure_url: result.secure_url, public_id: result.public_id };

    const newcat = {

        name: name,
        image: imagedata,

    };

    try {
        const updatedCat = await categoyModel.findByIdAndUpdate(req.params.id, newcat);

        // cattegory after update

        const updatedCategory = await categoyModel.findById(req.params.id);


        res.status(200).json(updatedCategory);

    } catch (error) {
        res.status(409).json({ message: error.message });
    }

}




// find category by id and delete category

exports.deleteCategory = async (req, res) => {

    const id = req.params.id;

    try {

        const category = await categoyModel.findById(id);

        const oldCategoryImage = category.image.public_id ? category.image.public_id : null;
        
        const removeFromCloudinary = await cloudinary.uploader.destroy(oldCategoryImage);

        const deletedCategory = await categoyModel.findByIdAndDelete(id);
        console.log("deletedCategory", deletedCategory);
     


        res.status(200).json('category deleted successfully');

    } catch (error) {
        res.status(409).json({ message: error.message });
    }

}


