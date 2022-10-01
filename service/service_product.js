const product= require("../model/product_model")

async function addProduct(params,callback){

    product.findOne({
    $and:[
      { 
       "TypePropert": params.type,
       "images":params.images,
       "Rooms": params.rooms,
       "desc": params.descn,
       "Price": params.price,
       "Amenities": params.Amenities,}
    ]}).then((result)=>{
        if (result) {
            callback(null,"Product Exists")
            
        }else{
            const addproduct = product({
                TypePropert: params.type,
                images:params.images,
                Rooms: params.rooms,
                desc: params.descn,
                Price: params.price,
                Amenities: params.Amenities,
               
        
            }) 
            addproduct.save()
            callback(null , "scusse")
            
        }
        
    }).catch((e)=>{
        callback(e)
    })
}

module.exports={
    addProduct
}
