const mongoose = require("mongoose")
const {Schema} = mongoose
const uniqueValidator = require("mongoose-unique-validator")
const mongosSchema = new Schema(
    {
        username:{
            type:String,
            required:true,

        },
        email:{
            type:String,
            required:true,
            unique:true

        },
        password:{
            type:String,
           // required:true
        },
        picture:{
            type:String,
        },
        phone:{
            type:String,
           // required:true,
        },
        country:{
            type:String,
           // required:true,
        },
        accountype:{
            type:String,
           // required:true,
        },
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
       delete returnedObject.password;
  

    }
})
mongosSchema.plugin(uniqueValidator,{message: "Email already Exists"})
const user = mongoose.model("users",mongosSchema)
module.exports = user