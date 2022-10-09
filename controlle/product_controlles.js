const productService = require("../service/service_product")


exports.createPt = (req,res,next)=>{
    const data = {
        "type":req.body.type ,
        "images":req.body.images ,
        "rooms":req.body.rooms ,
        "descn":req.body.descn ,
        "price":req.body.price ,
        "amenities":req.body.amenities ,
        "bathRooms":req.body.bathRooms ,
        "rentalPreiod":req.body.rentalPreiod ,

    
    }
   
    productService.addProduct(data,(err,result)=>{
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
exports.getPt = (req,res,next)=>{
 
   
    productService.getProduct((err,result)=>{
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