const user= require("../model/model")
const cards= require("../model/cardsmodel")
const balance= require("../model/balance.model")
const stripeService= require("../service/stripe.service")
const detectCardType = require('card-detector-js')
const totalbalance= require("../model/total.balance")
const order= require("../model/ordermodel")
var datetime = new Date();


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
                                    addDetailesBlanance(params ,callback ,"Success")
                                                 
                               
                              
    
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
                   
                  
                }
            })
        }

    })
}
const totalamount = async function(params ,callback ,type){
     if (type == "Success") {
        totalbalance.findOne({userId:params.userId}).then((e)=>{
       if (e) {
                totalbalance.findOneAndUpdate({"userId":params.userId},{"totalamount": e.totalamount + params.amount}).then((result)=>{
               
                
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
const addDetailesBlanance = async function(params ,callback ,type){
    balance.findOne({$and:[{"userId":params.userId},{"date":params.date}]},async function(err,result){
        if (result) {
   console.log(result)
            var date = result.date == datetime.toISOString().slice(0,10); 
        
            if (date) {                                               
                result.details.push({
                    "amount":params.amount,
                    "orderstatus":type,
                    "transctionsId":params.transctionsId,
                    "createdAt":params.createdAt
             })
             result.save()
             totalamount(params ,callback ,type)
             return   type === 'Reject'?null: callback(null ,result)
                       
            }else{
                const DetailesBalance = balance({
                    userId: params.userId,
                    date:datetime.toISOString().slice(0,10),
                    details:[
                        {
                              "amount":params.amount,
                              "orderstatus":type,
                              "transctionsId":params.transctionsId,
                              "createdAt":params.createdAt
                        }
                    ],
                  

                })
                DetailesBalance.save()
                totalamount(params ,callback ,type)
                return   type === 'Reject'?null:callback(null ,DetailesBalance)
                
            }
        }else{
            const DetailesBalance = balance({
                userId: params.userId,
                date:datetime.toISOString().slice(0,10),
                details:[
                    {
                          "amount":params.amount,
                          "orderstatus":type,
                          "transctionsId":params.transctionsId,
                          "createdAt":params.createdAt
                    }
                ],
              

            })
            DetailesBalance.save()
            totalamount(params ,callback ,type)
        return   type === 'Reject'?null:callback(null ,DetailesBalance)
        }

    })
   }
async function getTotalBalance(params ,callback){
 
    totalbalance.findOne({userId:params.userId},async function(err,response){
        return callback(null ,response)

    })
 }

 async function getBalance(params ,callback){
    balance.find({userId:params.userId}).sort({"date":-1}).then((result)=>{
      
            if (result) {
                return callback(null ,result)
            }
            
        
    })
 }

 async function subtractBalance(params ,callback){
    totalbalance.findOne({"userId":params.userId},async function (err, result){
    if (result) {
        if (result.totalamount > 0 && params.amount <= result.totalamount && params.amount >= 0) {

            addDetailesBlanance(params ,callback ,"Subtract")
            if (params.amount > result.totalamount) {
              
                return callback(null , "There is not enough balance, recharge with the required value")
            }else{
                totalbalance.findOneAndUpdate({"userId":params.userId},{"totalamount":result.totalamount - params.amount}).then((result)=>{
                    
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
                        orderstatus: "Pending", 
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