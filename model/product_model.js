const mongoose = require("mongoose")
const {Schema} = mongoose
const mongosSchema = new Schema(
    {
        TypePropert:{
            type:String,
           

        },
        images : [
          {
            type:String,
          
          }
        ],
        Rooms:{
            type:String,
          

        },
        Price:{
            type:String,
           
        },
        desc:{
            type:String,
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