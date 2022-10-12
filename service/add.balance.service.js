const user= require("../model/model")
const cards= require("../model/cardsmodel")
const balance= require("../model/balance.model")
const stripeService= require("../service/stripe.service")
const detectCardType = require('card-detector-js')


async function addBalace(params,callback){
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
                           
                            return  callback("err") 
                             
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
                        },async(err,result)=>{
                            if (err) {
                                
                                return callback(err)
                            }
                            if (result) {

                               const numberCard = await cards.findOne({"cardNumber":params.cardNumber})
                               if (numberCard != null) {
                                console.log("cardNumber is exist")
                             
                               }else{
                               const  cardType = detectCardType(params.cardNumber)
                                const Cardmodel =  cards({
                                    userId:UserDB.id,
                                    CardId:result.card,
                                    cardName: params.cardName,
                                    cardNumber: params.cardNumber,
                                    CardExpMonth: params.cardExpMonth,
                                    CardExpYear: params.cardExpYear,
                                    CardCvc: params.cardCvc,
                                    customerId:  model.stripCoustmerId,
                                    CardType:cardType,
                                    selected:false
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

                                const balc = balance({
                                    userId: UserDB.id,
                                    amount: params.amount,
                                    orderstatus :"Pending"

                                })
                                balc.save().then(async(response)=>{
                                    if (response) {
                                      
                                        return  callback(null,response)
                                    }else{
                                       
                                        return  callback(null,"response")
                                    }
                                  
                                }).catch((e)=>{ 
                                    return callback(e)
                                })

                                //return callback(null, result.creatPayementIntent.id)
                             

                             
                            }

                        }
                    )
                   
                  
                }
            })
        }

    })
}
async function getBalance(params ,callback){
 
    balance.find({userId:params.userId})
    .then((response)=>{
        
        return callback(null ,response)
    
    }).catch((r)=>{
        return callback(null ,r)
    })
    }
module.exports={
    addBalace,
    getBalance
}