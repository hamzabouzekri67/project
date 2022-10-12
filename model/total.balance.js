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
const user = mongoose.model("totalbalance",mongosSchema)
module.exports = user