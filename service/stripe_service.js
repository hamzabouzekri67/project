const stripeConfig = require("../config/config")
const stripe = require("stripe")(stripeConfig.stripConfig.STRIP_KEY_PUB)


async function createCostumer(params,callback){

    try {
        const coustmer = await stripe.customers.create({
            name:params.name,
            email:params.email,
        });
        callback(null ,coustmer)
        
    } catch (error) {
        return callback(error)
        
    }

}

async function addCards(params,callback){

    try {
        const card_token = await stripe.tokens.create({
            card:{
            name:params.cardName,
            number:params.cardNumber,
            exp_month:params.cardExpMonth,
            exp_year:params.cardExpYear,
            cvc:params.cardCvc

            }
            
        })

        const card = await stripe.customers.createSource(params.customerId,{
            source:`${card_token.id}`
        })

        callback(null ,{card:card.id})
        
    } catch (error) {
        return callback(error) 
    }

}
async function generatorPayement(params,callback){

    try {

        const creatPayementIntent =  await stripe.paymentIntents.create({
            amount: params.amount *100,
            currency:stripeConfig.stripConfig.STRIPE_KEY_CURRENCY,
            payment_method_types: ["card"],
            receipt_email: params.receipt_email,
            payment_method: params.card_id,
            customer:params.customer_id,

          });

      
        callback(null ,{creatPayementIntent})
        
    } catch (error) {
        return callback(error)
    }

}
module.exports={
    createCostumer,
    addCards,
    generatorPayement 
}