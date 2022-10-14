const balanceService = require("../service/add.balance.service")

exports.createBalance = (req,res,next)=>{
    const  model = {
        id:req.body.id,
        userId :req.body.userId,
        cardName :req.body.cardName,
        cardNumber :req.body.cardNumber,
        cardExpMonth : req.body.cardExpMonth,
        cardExpYear :req.body.cardExpYear,
        cardCvc :req.body.cardCvc,
        amount :req.body.amount,
        createdAt:req.body.createdAt,
        orderstatus:req.body.orderstatus,
        transctionsId:req.body.transctionsId,
        date:req.body.date

    }



  balanceService.addBalance(model,(err,result)=>{
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
exports.findAll = (req,res,next)=>{
    balanceService.getTotalBalance(req.body,(err,result)=>{
        if (err) {
            return next(err);
            
        }
        return res.status(200).send({
            code :200, 
            message:result,
           
 
        }
           
        )
    })
}
exports.findBalance = (req,res,next)=>{
    balanceService.getBalance(req.body,(err,result)=>{
        if (err) {
            return next(err);
            
        }
        return res.status(200).send({
            code :200, 
            message:result,
           
 
        }
           
        )
    })
}
exports.subBalance = (req,res,next)=>{
    balanceService.subtractBalance(req.body,(err,result)=>{
        if (err) {
            return next(err);
            
        }
        return res.status(200).send({
            code :200, 
            message:result,
           
 
        }
           
        )
    })
}