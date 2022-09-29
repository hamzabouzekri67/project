const orderService = require("../service/order_service")

exports.create = (req,res,next)=>{
    const  model = {
        userId :req.body.userId,
        cardName :req.body.cardName,
        cardNumber :req.body.cardNumber,
        cardExpMonth : req.body.cardExpMonth,
        cardExpYear :req.body.cardExpYear,
        cardCvc :req.body.cardCvc,
        amount :req.body.amount,

    }
   
    orderService.createOrder(model,(err,result)=>{
        if (err) {
            return next(err);
            
        }
        return res.json({
            status:"200",
            message:result
        }
           
        )
    })
}
exports.update = (req,res,next)=>{
    orderService.updateStatus(req.body,(err,result)=>{
        if (err) {
            return next(err);
            
        }
        return res.status(200).send({
            code :200, 
            message:"scusse",
            data:result
 
        }
           
        )
    })
}
exports.findAll = (req,res,next)=>{
    orderService.getOrders(req.user,(err,result)=>{
        if (err) {
            return next(err);
            
        }
        return res.status(200).send({
            code :200, 
            message:"scusse",
            data:result
 
        }
           
        )
    })
}