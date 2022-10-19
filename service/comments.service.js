const comments = require("../model/commentsmodel.js")
const gradient = require('gradient-color')


async function addcomments(params ,callback) {
    const color = [
        0xffFF0000,0xffFFFF00,0xffCD5C5C,
        0xff9FE2BF,0xff6495ED,0xffD39D38,
        0xffff6a00,0xfff8b500,0xffa044ff,
        0xff799F0C,0xff536976,0xff2b5876]
    let index = 0
    index = Math.floor(Math.random()*12)
  
    const comment = comments({
        productsId:params.productsId,
        userId:params.userId,
        comment:params.comment,
        createdAt:params.createdAt,
        demicelHex:color[index]
    })
    comment.save().then((result)=>{
        if (result) {
            return  callback(null,result)
        }else{
            return  callback(null,"not exptaded")
        } 

    })
 
    
}
async function fetchcomments(params ,callback) {
    comments.find({productsId:params.productsId}).sort({createdAt : -1})
    .populate('userId',)
    .then((response)=>{
      
        return callback(null ,response
        )
    
    }).catch((r)=>{
        return callback(null ,r)
    })
   
 
    
}

module.exports = {
    addcomments,
    fetchcomments
}