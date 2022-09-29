const mongoose = require("mongoose")
const {Schema} = mongoose
const mongosSchema = new Schema(
    {
        cardName:{
            type:String,
            required:true,

        },
        cardNumber:{
            type:String,
            required:true,
            unique:true,

        },
        CardExpMonth:{
            type:String,
            required:true,

        },
        CardExpYear:{
            type:String,
            required:true,

        },
        CardCvc:{
            type:String,
            required:true,

        },
        customerId:{
            type:String,
            required:true
           
        },
        CardId:{
            type:String,
            required:true,
            unique:true,

        },
        accountype:{
            type:String,
           // required:true,
        },
     
        

    },{
        timestamps:true
    }
)
const user = mongoose.model("CustomerCards",mongosSchema)
module.exports = user