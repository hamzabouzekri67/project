const mongoose = require("mongoose")
const {Schema} = mongoose
const mongosSchema = new Schema(
    {
        userId:{
            type:String,
            required:true,

        },
        products:
        [
            {
                product:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"Product",
                    required:true
                },
                quantity:{
                    type:Number,
                    require:true
                }
            }

        ]
      
      
      
        
    },{
        timestamps :true
    }
   
)
mongosSchema.set("toJSON",{
    transform:(model,ret)=>{
       ret.cartId = ret._id.toString(),
       delete ret._id;
       delete ret.__v;
      
  

    }
})
const user = mongoose.model("cart",mongosSchema)
module.exports = user