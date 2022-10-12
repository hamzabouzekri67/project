const mongoose = require("mongoose")
const {Schema} = mongoose
const mongosSchema = new Schema(
    {
        userId:{
            type:String,
            required:true,

        },
        totalamount:{
            type:Number,
            required:true
        },
        orderstatus:{
            type:String,
            required:true,
        },
      
      

    },{timestemp:true}
)
mongosSchema.set("toJSON",{
    transform:(document,returnedObject)=>{
       returnedObject.id = returnedObject._id.toString(),
       delete returnedObject._id;
       delete returnedObject.__v;
     
    }
})
const balance = mongoose.model("totalbalance",mongosSchema)
module.exports = balance