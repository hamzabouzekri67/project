const cartmodel = require("../cart/cart_model")
const async = require("async")


async function addcart(params,callback){
    if (!params.userId) {
        return callback({
            message:"UserId Requird"
        })
    }

  cartmodel.findOne({userId:params.userId},function(err,cartDB){
    if (err) {
        return  callback(err)
    }else{
        if (cartDB == null) {
            const cartModel = cartmodel({
                userId:params.userId,
                products:params.product


            });
            cartModel.save().then((respose)=>{
                return callback(respose)

            }).catch((error)=>{
                return callback(error)                
            })
        }else if(cartDB.product.length == 0){
            cartDB.products = params.product;
            cartDB.save()

        }else{
            async.eachSeries(params.product ,function(product,asyncDone){
                let itemIndex = cartDB.products.findIndex(p=>p.product == product.product)

                if (itemIndex === -1) {
                    cartDB.products.push({
                        product:product.product,
                        quantity:product.quantity
                    })
                    cartDB.save(asyncDone)
                }else{
                    cartDB.products[itemIndex].quantity = cartDB.products[itemIndex].quantity + product.quantity
                    cartDB.save(asyncDone)
                }
            })
            return callback(null,cartDB)
        }
    }

 })


 async function getcart(params,callback){
  cartmodel.findOne({userId:params.userId})
  .populate({
    path:'products',
    populate:{
        path:'product',
         model:'Product',
         select:"product productPrice , productSalePrice ,productImage"

    }
  }).then((respose)=>{
   return callback(null ,respose)
  }).catch((err)=>{
    return callback(err)
  })
 }
    
}