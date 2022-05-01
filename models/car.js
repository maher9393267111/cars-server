const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
    {
        name: {
          type: String,
          trim: true,
          required: "Name is required",
          minlength: [2, "Too short"],
          maxlength: [32, "Too long"],
        },
    
        price: { type: Number },
        tittle: { type: String },
        description: { type: String },
        maked_at: { type: Date, default: Date.now },
    
        car_id: { type: Number, required: true },
    
      
        inside_images:[
    {
    
    
            secure_url:{type:String},
            public_id:{type:String}
    }
        ]
  ,  
outside_images:
//[

{ 

     back_imagesb:[  {secure_url : String  ,public_id:String}     ]    ,


 front_imagesf:[  {secure_url : String  ,public_id:String}     ]    ,


}


//]


,


    
    
        
      },
      { timestamps: true }
    );
    

module.exports = mongoose.model("Car", carSchema);
