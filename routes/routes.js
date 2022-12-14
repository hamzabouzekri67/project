const express = require("express")
const routes  =express.Router()
const controlles = require("../controlle/controlles")
const ordercontrolles = require("../controlle/orderControlle")
const ptoductcontrolles = require("../controlle/product_controlles")
const cateogrycontrolles = require("../controlle/categorycontrolle")
const balancecontrolles = require("../controlle/balance.controlle")
const commentscontrolles = require("../controlle/comments.controlles")

routes.post("/register",controlles.register)
routes.post("/login",controlles.login)
routes.get("/userProfile",controlles.userProfile)
routes.post("/getdata",controlles.getdata)
routes.post("/updateData",controlles.updateData)

routes.post("/order",ordercontrolles.create)
routes.post("/findorder",ordercontrolles.findAll)
routes.put("/order",ordercontrolles.update)
routes.post("/deletedOrder",ordercontrolles.deletedOrder)


routes.post("/product",ptoductcontrolles.createPt)
routes.get("/getproduct",ptoductcontrolles.getPt)

routes.post("/categroy",cateogrycontrolles.createcg)
routes.post("/getcategroy",cateogrycontrolles.getcatg)

routes.post("/getCard",ordercontrolles.findCard)
routes.post("/moveCard",ordercontrolles.moveCard)

routes.post("/addBalance",balancecontrolles.createBalance)
routes.post("/getBalance",balancecontrolles.findAll)


routes.post("/transactions",balancecontrolles.findBalance)
routes.post("/subtract",balancecontrolles.subBalance)
 
routes.post("/comments",commentscontrolles.Addcomments)
routes.post("/fetchComments",commentscontrolles.fetchComments)

module.exports = routes   