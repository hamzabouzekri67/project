const mongoose = require("mongoose")
const {Schema} = mongoose
const mongosSchema = new Schema(
    {
        userId:{
            type:String,
            required:true,

        },
        amount:{
            type:Number,
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
const user = mongoose.model("balance",mongosSchema)
module.exports = user