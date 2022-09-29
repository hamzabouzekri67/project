const express = require("express")
const routes  =express.Router()
const controlles = require("../controlle/controlles")
const ordercontrolles = require("../controlle/orderControlle")

routes.post("/register",controlles.register)
routes.post("/login",controlles.login)
routes.get("/userProfile",controlles.userProfile)
routes.post("/getdata",controlles.getdata)
routes.post("/updateData",controlles.updateData)

routes.post("/order",ordercontrolles.create)
routes.get("/order",ordercontrolles.findAll)
routes.put("/order",ordercontrolles.update)



module.exports = routes