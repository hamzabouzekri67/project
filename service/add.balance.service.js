const user= require("../model/model")
const cards= require("../model/cardsmodel")
const balance= require("../model/balance.model")
const stripeService= require("../service/stripe.service")
const detectCardType = require('card-detector-js')
const totalbalance= require("../model/total.balance")


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
                                const balc = balance({
                                    userId: UserDB.id,
                                    amount: params.amount,
                                    orderstatus :"refuse",
                                    createdAt:params.createdAt
    
                                })
                                balc.save()
    
                                
                                return callback(null,balc.orderstatus == "success")
                            }else{
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
                                    const balc = balance({
                                     userId: UserDB.id,
                                     amount: params.amount,
                                     orderstatus :"success",
                                     createdAt:params.createdAt
     
                                 })
                                 balc.save()
     
                                
                                if (balc.orderstatus == "success") {
                                 totalbalance.findOne({userId:UserDB.id}).then((e)=>{
                                     if (e) {
                                           console.log()
                                             totalbalance.findOneAndUpdate({"userId":UserDB.id},{"totalamount": e.totalamount + params.amount}).then((result)=>{
                                                 return callback(null ,result)
                                                 
                                             })
                                        
                                        
                                     } else {
                                         const total =  totalbalance({
                                             "userId": params.userId,
                                             "orderstatus": "Success",
                                             "totalamount": params.amount,
                                            }) 
                                            total.save()
                                 
                                     }
                          
                                    })
                                 
                                }
                              
     
                                    
                                   
                                     
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
 
    balance.find({userId:params.userId},async function(err,response){
        return callback(null ,response)

    })
 }
module.exports={
    addBalace,
    getBalance
}