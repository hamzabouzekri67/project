const express = require("express")
const app  = express()
const mongoose = require("mongoose")
const config = require("./config/config")
const auth = require("./middleware/auth")
const err = require("./middleware/errors")
const route = require("./routes/routes")
const {unless} = require("express-unless")

const Port = process.env.PORT|| 8080 

app.use(express.json())

mongoose.Promise = global.Promise


async function connectDatabase(){
 await mongoose.connect(config.Mong_DB,{
    useNewUrlParser: true,
    useUnifiedTopology:true
 }).then(()=>{
    console.log(`server moongos connectDataBase`)
}).catch((e)=>{
    console.log(`server moongose not  connectionsDataBase ${e}`)
})
}
connectDatabase()


auth.authenticationsToken.unless = unless;
app.use(auth.authenticationsToken.unless({
    path:[
        {url: "/users/login", methods:["POST"]},
        {url: "/users/register", methods:["POST"]}
    ]
}))
app.use("/users", route)
app.use(err.errorsHandler) 


app.listen(Port ,()=>{
    console.log(`server connections ${Port}`)
} ) 

