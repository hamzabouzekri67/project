const mongoose = require("mongoose")
const {Schema} = mongoose
const mongosSchema = new Schema(
    {
        userId:{
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
const user = mongoose.model("Order",mongosSchema)
module.exports = user