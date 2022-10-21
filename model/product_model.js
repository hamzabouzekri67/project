const mongoose = require("mongoose")
const {Schema} = mongoose
const mongosSchema = new Schema(
    {
        TypePropert:{
            type:String,
            required:true,
            
           

        },
        images : [
          {
            type:String,
            required:true,
          
          }
        ],
        Rooms:{
            type:String,
            required:true,
          

        },
        bathRooms:{
            type:String,
            required:true,
          

        },
        
        RentalPriod:{
            type:String,
            required:true,
          

        },
        Price:{
            type:String,
            required:true,
           
        },
        desc:{
            type:String,
            required:true,
        },
        Amenities:[
            {
            type:String, 
            required:true,
        

            }
        ],

        place:{
            type:String,
            required:true,
            
        },
        country:{
            type:String,
            required:true,
            
        },
        city:{
            type:String,
            required:true,
            
        },
        latitude:{
            type:String,
            required:true,

        },
        longitude:{
            type:String,
            required:true,

        },
        createdAt:{
            type:String,
            
        }
      
        

    }
)
mongosSchema.set("toJSON",{
    transform:(document,returnedObject)=>{
       returnedObject.id = returnedObject._id.toString(),
       delete returnedObject._id;
       delete returnedObject.__v;
     
  

    }
})
const user = mongoose.model("product",mongosSchema)
module.exports = user