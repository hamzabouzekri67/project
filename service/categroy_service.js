const category= require("../model/categorymodel")
const async  = require("async")


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
        category.findOne({category:params.categroy},function(err,chechcategroy){
            if (categroyDb) {
                if (chechcategroy) {
                    var item = categroyDb.item.find(item => item.productes == params.orderid); 
                  
                   if (item != null || item != undefined || item) {
                    console.log("exist")
                   
                   }else{
                    var item = params.item.find(item => item.productes ); 
                    console.log(item)
                      
                    categroyDb.item.push({
                            "productes":item.productes ,
                            "category": item.category
                             
                     })
                     categroyDb.save()
                   }
                    return callback(null , chechcategroy)
                    
                }else{
                    const categroyModel = category({
                        userId:params.userId,
                        category:params.categroy, 
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
                
            }else{
                const categroyModel = category({
                    userId:params.userId,
                    category:params.categroy, 
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
               

            })
           

           
            
              
           

        }
       
    })
}
async function getCategroy(params,callback){
   
    const user = await category.find({userId:params.userId})
       
    .populate({
        path:"item",
        populate:{
            path:"productes",
            module:"product",
            select:"Price images Rooms TypePropert Amenities",
        }
      
        
     }).then((result)=>{
        return callback(null,result)

     }).catch((e)=>{
        return callback(e,user)
     })
    
  
}
module.exports ={
    addcategroy,
    getCategroy,
} 