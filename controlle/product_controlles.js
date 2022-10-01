const productService = require("../service/service_product")


exports.createPt = (req,res,next)=>{
    const data = {
        "type":req.body.type ,
        "images":req.body.images ,
        "rooms":req.body.rooms ,
        "descn":req.body.descn ,
        "price":req.body.price ,
        "Amenities":req.body.amenities ,
    
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