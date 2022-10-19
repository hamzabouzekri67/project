const mongoose = require("mongoose")
const {Schema} = mongoose
const mongosSchema = new Schema(
    {
        productsId:{
            type:String,
            required:true,
        },
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required:true,

        },
        comment:{
            type:String,
           // required: true
        },
        demicelHex:{
            type:Number,

        },
        createdAt:{
            type:String,
            required:true

        }
       
      

    },{timestemp:true}
)
mongosSchema.set("toJSON",{
    transform:(document,returnedObject)=>{
       returnedObject.id = returnedObject._id.toString(),
       delete returnedObject._id;
       delete returnedObject.__v;
     
    }
})
const comment = mongoose.model("comment",mongosSchema)
module.exports = comment