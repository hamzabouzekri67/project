const mongoose = require("mongoose")
const {Schema} = mongoose
const mongosSchema = new Schema(
    {
        userId:{
            type:String,
            
        },
        category:{
            type:String,
            required:true ,
          
        },
      item:[
      
        {
           productes:{
            type :mongoose.Schema.Types.ObjectId,
            ref:"product",
            required:true,
           },
           category:{
            type:String,
            required:true ,
          
        },
        }  
      ]
      
        

    },{
        timestamps:true
    }
)
mongosSchema.set("toJSON",{
    transform:(document,returnedObject)=>{
       returnedObject.id = returnedObject._id.toString(),
       delete returnedObject._id;
       delete returnedObject.__v;
     
  

    }
})
const user = mongoose.model("category",mongosSchema)
module.exports = user