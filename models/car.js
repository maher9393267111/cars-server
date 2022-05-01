const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
      minlength: [2, "Too short"],
      maxlength: [32, "Too long"],
    },

price:{type:Number,required:true},
tittle:{type:String,required:true},
description:{type:String,required:true},
maked_at:{type:Date,default:Date.now},


    
// cloudinary cars images well be for car inside photos array and
// car outside photos array


// car inside photos array

inside_photos:[{

    secure_url: {

        type: String,

        default: "",

    },

    public_id: {

        type: String,

        default: "",

    },

    }],

    outside_images: [{

       

        secure_url: {

            type: String,
    
            default: "",
    
        },

        public_url: {

            type: String,
    
            default: "d",
    
        },

    }],


  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);