const express = require("express")
const routes  =express.Router()
const controlles = require("../controlle/controlles")
routes.post("/register",controlles.register)
routes.post("/login",controlles.login)
routes.get("/userProfile",controlles.userProfile)
routes.post("/getdata",controlles.getdata)
routes.post("/updateData",controlles.updateData)


module.exports = routes