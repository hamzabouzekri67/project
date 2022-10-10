const express = require("express")
const routes  =express.Router()
const controlles = require("../controlle/controlles")
const ordercontrolles = require("../controlle/orderControlle")
const ptoductcontrolles = require("../controlle/product_controlles")
const cateogrycontrolles = require("../controlle/categorycontrolle")

routes.post("/register",controlles.register)
routes.post("/login",controlles.login)
routes.get("/userProfile",controlles.userProfile)
routes.post("/getdata",controlles.getdata)
routes.post("/updateData",controlles.updateData)

routes.post("/order",ordercontrolles.create)
routes.get("/order",ordercontrolles.findAll)
routes.put("/order",ordercontrolles.update)

routes.post("/product",ptoductcontrolles.createPt)
routes.get("/getproduct",ptoductcontrolles.getPt)

routes.post("/categroy",cateogrycontrolles.createcg)
routes.post("/getcategroy",cateogrycontrolles.getcatg)

routes.get("/getCard",ordercontrolles.findCard)
 

module.exports = routes