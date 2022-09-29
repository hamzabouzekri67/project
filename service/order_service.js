const user= require("../model/model")
const cards= require("../model/cardsmodel")
const order= require("../model/ordermodel")

const stripeService= require("../service/stripe_service")


async function createOrder(params,callback){
    user.findOne({_id:params.userId},async function(err,UserDB){
        if (err) {
            callback(err)
        }else{
           
            const model = {}
            if (!UserDB.stripCoustmerId) {
              

                stripeService.createCostumer(
                    {
                        "name":UserDB.username,
                        "email":UserDB.email,
                    },(err,result)=>{
                        if (err) {
                           
                            return  callback(err)
                            
                        }
                        if (result) {
                            console.log(err)
                            UserDB.stripCoustmerId =result.id,
                            UserDB.save();
                           

                            model.stripCoustmerId =result.id
                        }
                    }
                )
                
            }else{
                model.stripCoustmerId =UserDB.stripCoustmerId
            }
            cards.findOne({
                customerId:model.stripCoustmerId,
                cardNumber:params.cardNumber,
                CardExpMonth:params.CardExpMonth,
                CardExpYear:params.CardExpYear,
             

            },async function(err,CarddDB){
                if (err) {
                  
                    return callback(err)
                }else{
                    if (!CarddDB) {
                       
                        await stripeService.addCards({
                            "cardName":params.cardName,
                            "cardNumber":params.cardNumber,
                            "cardExpMonth":params.cardExpMonth,
                            "cardExpYear":params.cardExpYear,
                            "cardCvc":params.cardCvc,
                            "customerId":model.stripCoustmerId,
                        },(err,result)=>{
                            if (err) {
                                
                                return callback(err)
                            }
                            if (result) {

                               const numberCard =  cards.findOne({"cardNumber":"6011981111111113"})
                               if (numberCard != null) {
                               
                               }else{
                                console.log("hhhhh")
                                const Cardmodel =  cards({
                                    CardId:result.card,
                                    cardName: params.cardName,
                                    cardNumber: params.cardNumber,
                                    CardExpMonth: params.cardExpMonth,
                                    CardExpYear: params.cardExpYear,
                                    CardCvc: params.cardCvc,
                                    customerId:  model.stripCoustmerId,
                                })

                                Cardmodel.save();
                                model.CardId = result.card
                              

                               }
                               
                              
                                
                            }

                        })
                    }else{

                        model.CardId = CarddDB.CardId
                        
                      
                    }
                    await stripeService.generatorPayement(
                        {
                            "receipt_email":UserDB.email,                          
                            "amount":params.amount,
                            "customer_id":model.stripCoustmerId,
                            "card_id":model.CardId,
                        },(err,result)=>{
                            if (err) {
                              return  callback(err)
                              
                            }
                            if (result) {
                                model.paymentIntentsId = result.creatPayementIntent.id,
                                model.client_secret = result.creatPayementIntent.client_secret
                             
                            }

                        }
                    )

                    const ordermodel = order({
                        userId: UserDB.id,
                        product: "villa",
                        orderstatus: "pending",
                        amount:params.amount 
                    })
                    ordermodel.save().then(async(response)=>{
                        model.orderId =response.id;
                        return  callback(null,model)
                    }).catch((e)=>{ 
                        return callback(e)
                    })
                }
            })
        }

    })
}

async function updateStatus(params ,callback){
var model = {
    orderstatus:params.status,
    transctionsId:params.transctionsId
    
}
order.findByIdAndUpdate(params.order,model,{useFindAndModify:false})
.then((response)=>{
    if (!response) {
        return callback(null ,"order update Fialed")
    }else{
        return callback(null ,response)
    }
}).catch((r)=>{
    return callback(null ,r)
})

}


async function getOrders(params ,callback){
 
    order.findOne({userId:params.userId})
    .then((response)=>{
        return callback(null ,response)
    
    }).catch((r)=>{
        return callback(null ,r)
    })
    }


    module.exports = { 
        createOrder,
        updateStatus,
        getOrders

    }