const category= require("../model/categorymodel")
const async  = require("async")
var ObjectId = require('mongodb').ObjectID;


async function addcategroy(params,callback){
   
    if (!params.userId) {
        return callback({
            message:"userid requird"
        })
        
    }
    category.findOne({userId:params.userId},function(err,categroyDb){
        if (err) {
            return callback(err)
            
        }else{
            if (categroyDb != null) {
                var item = categroyDb.item.find(item => item.productes == "633a1895fc3523ddc7087cgf"); 

               if (item != null || item != undefined) {
                console.log(item)
               
               }else{
                categroyDb.item =params.item
                categroyDb.save()
               }
                return callback(null , categroyDb)
                
            }else{
                const categroyModel = category({
                    userId:params.userId,
                    item:params.item
                })
                categroyModel.
                save()
                .then((response)=>{
                    return callback(null ,categroyDb)
                   
                }).catch((err)=>{
                    return callback(err)
                }) 

            
            
            }
            
              
           

        }
       
    })
}
async function getCategroy(params,callback){
   
   
    category.findOne({userId:params.userId})
    .populate({
        path:"item",
        populate:{
            path:"productes"            ,
            module:"product",
            select:"Price images Rooms TypePropert Amenities",
        }
      
        
    }).then((result)=>{
        return callback(null ,result)
    }).catch((e)=>{
        return callback(e)
    })
}
module.exports ={
    addcategroy,
    getCategroy,
}