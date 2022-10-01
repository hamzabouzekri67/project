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
           required:true 
          }
        ],
        Rooms:{
            type:String,
          

        },
        Price:{
            type:String,
            required:true 
        },
        desc:{
            type:String,
            required:true,
        },
        Amenities:[
            {
            type:String, 
        

            }
        ],
         
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