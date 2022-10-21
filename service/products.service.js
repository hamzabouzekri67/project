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
       "Amenities": params.amenities,
       "bathRooms":params.bathRooms ,
       "RentalPriod":params.rentalPreiod,
       "place":params.place,
        "city":params.city}
    ]}).then((result)=>{
        if (result) {
           return callback(null,"Product Exists")
            
        }else{
            const addproduct = product({
                TypePropert: params.type,
                images:params.images,
                Rooms: params.rooms,
                desc: params.descn,
                Price: params.price,
                Amenities: params.amenities,
                bathRooms:params.bathRooms ,
                RentalPriod:params.rentalPreiod,
                place:params.place,
                city:params.city
               
        
            }) 
            addproduct.save()
            return  callback(null , "scusse")
            
        }
        
    }).catch((e)=>{
        return callback(e)
    })
}
async function getProduct(callback){
    product.find().then((result)=>{
        if (result) {
            callback(null,result)
            
        }
        
    }).catch((e)=>{
        callback(e)
    })
}

module.exports={
    addProduct,
    getProduct
}
