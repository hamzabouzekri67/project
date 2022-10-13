const user= require("../model/model")
const cards= require("../model/cardsmodel")
const balance= require("../model/balance.model")
const stripeService= require("../service/stripe.service")
const detectCardType = require('card-detector-js')
const totalbalance= require("../model/total.balance")
const order= require("../model/ordermodel")


async function addBalance(params,callback){
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
                                    orderstatus :"Refused",
                                    createdAt:params.createdAt
    
                                })
                                balc.save()
                                return callback(err)
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
                                     orderstatus :"Success",
                                     createdAt:params.createdAt
     
                                 })
                                 balc.save()
     
                                
                                if (balc.orderstatus == "Success") {
                                 totalbalance.findOne({userId:UserDB.id}).then((e)=>{
                                     if (e) {
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
async function getTotalBalance(params ,callback){
 
    totalbalance.findOne({userId:params.userId},async function(err,response){
        return callback(null ,response)

    })
 }

 async function getBalance(params ,callback){
    balance.find({userId:params.userId},async function(err,response){
        if (err) {
            
        } else {
            if (response) {
                return callback(null ,response)
            }
            
        }
    })
 }

 async function subtractBalance(params ,callback){
    totalbalance.findOne({"userId":params.userId},async function (err, result){
    if (result) {
        if (result.totalamount >= 0) {
            const balances = balance({
                userId: params.userId,
                amount: params.amount,
                orderstatus :"subtract",
                createdAt:"params.createdAt"
            })
            balances.save()
            if (params.amount > result.totalamount) {
              
                return callback(null , "There is not enough balance, recharge with the required value")
            }else{
                totalbalance.findOneAndUpdate({"userId":params.userId},{"totalamount":result.totalamount - params.amount}).then((result)=>{
                    return callback(null ,'success')         
            })
               
            }
           
              
            
        }else{
            return callback(null , "There is not enough balance, recharge with the required value")
        }

        order.findOne({$and:[{"productes":params.id},{"userId":params.userId}]},async function(err,result){
            if (err) { 
               return callback(err)
            }else{
                if (result) {
                    //return  callback(null ,"exist")
                }else{
                    const ordermodel = order({
                        userId: params.userId,
                        productes: params.id,
                        orderstatus: "pending", 
                        amount:params.amount 
                    })
                    ordermodel.save().then(async(response)=>{
                        if (response) {
                            model.orderId =response.id;
                            return  callback(null,model)
                        }else{
                            model.orderId =response.id;
                            return  callback(null,model)
                        }
                      
                    }).catch((e)=>{ 
                        return callback(e)
                    })

                }
              
            }      
        })
    }
    })
 }
module.exports={
    addBalance,
    getTotalBalance,
    getBalance,
    subtractBalance
}