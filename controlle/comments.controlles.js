const commentsService = require("../service/comments.service")


exports.Addcomments = (req,res,next)=>{

    commentsService.addcomments(req.body,(err,result)=>{
        if (err) {
            return next(err) 
        }else{
            return res.json({
                status:"200",
                message:result
            })
        }
    })
}


exports.fetchComments = (req,res,next)=>{

    commentsService.fetchcomments(req.body,(err,result)=>{
        if (err) {
            return next(err) 
        }else{
            return res.json({
                status:"200",
                message:result
            })
        }
    })
}