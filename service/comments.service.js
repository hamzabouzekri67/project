const comments = require("../model/commentsmodel.js")


async function addcomments(params ,callback) {
    const comment = comments({
        productsId:params.productsId,
        userId:params.userId,
        comment:params.comment,
        createdAt:params.createdAt
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
    comments.find({productsId:params.productsId})
    .populate('userId',)
    .then((response)=>{
        return callback(null ,response)
    
    }).catch((r)=>{
        return callback(null ,r)
    })
   
 
    
}

module.exports = {
    addcomments,
    fetchcomments
}