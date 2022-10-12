const categoryService = require("../service/categroy.service")

exports.createcg = (req,res,next)=>{
    const data = {
        "userId":req.body.userId,
        "orderid":req.body.orderid,
        "item":req.body.item,
        "categroy":req.body.categroy
    
    }
   
    categoryService.addcategroy(data,(err,result)=>{
        if (err) {
            return next(err);
            
        }
        return res.status(200).send({
            code :200, 
            message:result
 
        }
           
        )
    })
}
exports.getcatg = (req,res,next)=>{
    const data = {
        "userId":req.body.userId, 
    }
   
    categoryService.getCategroy(data,(err,result)=>{
        if (err) {
            return next(err);
            
        }
        return res.status(200).send({
            code :200, 
            message:result
 
        }
           
        )
    })
}