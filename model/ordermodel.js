const mongoose = require("mongoose")
const {Schema} = mongoose
const mongosSchema = new Schema(
    {
        userId:{
            type:String,
            required:true,

        },
        orderId:{
            type:String,
            required:true,

        },
        createdAt:{
            type:String,
            required:true,

        },
        productes:{
            type :mongoose.Schema.Types.ObjectId,
            ref:"product",
            required:true,
        },
        amount:{
            type:String,
            required:true
        },
        orderstatus:{
            type:String,
            required:true,
        },
        transctionsId:{
            type:String,
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
const order = mongoose.model("Order",mongosSchema)
module.exports = order