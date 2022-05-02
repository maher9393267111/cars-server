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
    
      
        inside_images:
            { 

                koltuk_images:[  {secure_url : String  ,public_id:String}     ]    ,
           
           
            konsole_images:[  {secure_url : String  ,public_id:String}     ]    ,
           
           
           }



        
  ,  



outside_images:


{ 

     back_images:[  {secure_url : String  ,public_id:String}     ]    ,


 front_images:[  {secure_url : String  ,public_id:String}     ]    ,


}




,


category: { type: mongoose.Schema.ObjectId, ref: "Category" },


yakit_tipi: { type: String },

mesafe: { type: String },

creted_at: { type: Date, default: Date.now },
city: { type: String },

satici_name: { type: String },





    
    
        
      },
      { timestamps: true }
    );
    

module.exports = mongoose.model("Car", carSchema);
