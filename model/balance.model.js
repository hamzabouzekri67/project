const mongoose = require("mongoose")
const {Schema} = mongoose
const mongosSchema = new Schema(
    {
        userId:{
            type:String,
            required:true,

        },
        date:{
            type:String,
            required:true,
        },
        details:[
            {
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
                createdAt:{
                    type:String,
                    required:true,
                }

            }

        ]
       
      

    },{timestemp:true}
)
mongosSchema.set("toJSON",{
    transform:(document,returnedObject)=>{
       returnedObject.id = returnedObject._id.toString(),
       delete returnedObject._id;
       delete returnedObject.__v;
     
    }
})
const balance = mongoose.model("balance",mongosSchema)
module.exports = balance