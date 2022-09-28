const jwt = require("jsonwebtoken")

function authenticationsToken(req,res,next){
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null) return res.json({

        message:"Invalid token"
    })


    jwt.verify(token , 'realestates_Sceretkey',(err,user)=> {
        if (err) return  res.status(300).json({
             
            "data":null
        })
        req.user = user;
        console.log(user)
        next()
    })

}




function generatorToken(username){
   return jwt.sign({data:username},"realestates_Sceretkey",{
        expiresIn : "10d"
    })

}

module.exports = {
    authenticationsToken,
    generatorToken
    
} 