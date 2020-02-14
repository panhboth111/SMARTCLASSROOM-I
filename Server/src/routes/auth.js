const express = require('express')
const router = express.Router()
const verify = require("../utilities/VerifyToken")
const UserService = require('../services/UserService')
const userService = new UserService()
// Sign Up for an account
router.post("/signUp", async (req , res) => {
    const response =  await userService.signUp(req.body)
    res.send(response)
})
//Login
router.post("/login", async (req , res ) => {
    if(!req.body.pwd || !req.body.email) return res.json({"message":"Empty fields"})
    const token = await userService.signIn(req.body)
    if(token=="invalid") return res.json({"message":"Validation error"})
    else if(token=="incorrect") return res.json({"message":"Incorrect password"})
    else return res.header("auth-token",token).json({"message" : "Login Success", "token" : token})
})
//change password
router.post("/changePassword", verify , async ({password,newPassword} , res ) =>  {
    const response = await userService.changePassword(req.user.email,password,newPassword)
    return res.json(response)
})
module.exports = router