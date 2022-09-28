const bycrpt = require("bcryptjs");
const auth = require('../middleware/auth');
const users = require("../model/model");
const { MongoClient, ObjectID } = require('mongodb');


async function login(login,password,callback){
    
 await users.findOne(
    {$or:[{"email":login},{"phone":login}]}).then(async(data)=>{
        if (data != null) {
            console.log(data["accessToken"] )
            if(data["email"] == login || data["phone"] == login  ){
                if ((password != null && password != "")) {
                    const token = auth.generatorToken(login)
                  
                    return callback(null , {id:data['id'],token})
                }else{
                   
                  
                    return callback({ 
                      
                        message:"Invailed email/password"
                    })
                }
             
               
            }
            else{
                return callback({
                    message:"User Not Existe"
                })
             }
          
         }else{
            return callback({
                message:"User Not Existe"
            })
         }
        
    });
 
}
 async function register(params,callback){
    if (params.username  === undefined) {
        return callback({message:'username REQUIRD'})
      
    }
       const user =  users(params);
       user.save()
    .then((res)=>{
        return callback(null,res)
    }).catch((err)=>{
        return callback(err)
    })
   } 

   async function getdata(id,callback){
   
    const user = await users.findOne({_id: ObjectID(id)});
    if (user != null) {
       return callback(null ,user)
    }else{
       return callback("User Not Existe")
    }
   }

   async function updateData(id,itme,callback){
    users.findByIdAndUpdate({_id:ObjectID(id)},itme).then((data)=>{
       console.log(itme)
    if (data != null) {
         return callback(null ,data)
     }else{
        return callback("User Not Existe")
     }
   }).catch((e)=>{
    return callback("User Not Existe")
   })
   
  
   }
  

module.exports = {
    login,
    register,
    getdata,
    updateData
}