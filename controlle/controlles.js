const bcrypt = require("bcryptjs")
const service = require("../service/service")

exports.register = async (req,res,next)=>{
    const {password} = req.body
    const salt = await bcrypt.genSaltSync(10)
    if (password === "" || password === null) {
      
    }else{
        req.body.password = bcrypt.hashSync(password,salt)
    }
    service.register(req.body,(err,result)=>{
        if (err) {
            return next(err)
        }

        return res.json({
            status:"200",
            message:result
        })
    })
 
}
exports.login = (req,res,next)=>{
    const {login,password} = req.body
   
    service.login(login,password,(err,result)=>{
        if (err) {
            return next(err);
            
        }
        return res.status(200).send({
            code :200, 
            message:result
 
        }
           
        )
    })
}
exports.getdata = (req,res,next)=>{
    const {id} = req.query 
    console.log(id)
    service.getdata(id,(err,result)=>{
        if (err) {
            return next(err);
            
        }
        return res.status(200).send({
            code :200,
            data:result
 
        }
           
        )
    })
}
exports.updateData = (req,res,next)=>{
    const {id} = req.query 
    //const {username , password , country ,phone ,picture} = req.body 
    const salt =bcrypt.genSaltSync(10)
    const key = `${req.body.key}`
    const value = req.body.value
    if (req.body.key === "password") {
    
      req.body.value = bcrypt.hashSync(value,salt)
       
       
    }else{}
   
    const itme = {
        [key] :req.body.value,
     
    }
    console.log(id)
    service.updateData(id,itme,(err,result)=>{
        if (err) {
            return next(err); 
            
        }
        return res.status(200).send({
            code :200,
            data:result
 
        }
           
        )
    })
}

exports.userProfile = (req,res ,next)=>{
    return res.status(200).json({
        message:"Authorization"
    })

} 