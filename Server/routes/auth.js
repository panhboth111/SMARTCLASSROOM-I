const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require("../models/user")
const Credential = require("../models/credential")
const validate = require("validate.js")
const verify = require("../utilities/VerifyToken")

// Sign Up for an account
router.post("/signUp", async (req , res) => {
    console.log(req.body)
    email = req.body.email.toLowerCase()
    name = req.body.name
    password = req.body.pwd
    role = ""
    let reg = /[a-z,.]{4,}\d{2,}@kit.edu.kh/ig
    let lectReg = /[a-z,.]{4,}@kit.edu.kh/ig
    let devReg = /device-[A-Z,a-z,0,9]{4}@device.com/ig
    if ( reg.test(email) ) role = "Student"
    else if(lectReg.test(email)) role = "Lecturer" 
    else if(devReg.test(email)) role = "Device"
    else return res.json({"message" : "Only KIT email is allowed","errCode" : "SU-001"})
    console.log(role)
    await bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) {
                console.log(err)
                return res.json({err})
            }
            try{
                console.log("trying...")
                const user = new User({
                    email : email,
                    name : name
                });
                const credential = new Credential({
                    email : email,
                    pwd : hash,
                    role : role
                })

                await user.save();
                const savedCredential = await credential.save();
                console.log("done")
                return res.json(savedCredential);
            }catch(err){
                console.log(err)
                if (err.code == 11000){
                    return res.json({"message" : "Email is already registered!","errCode" : "SU-002"})
                }
                return res.json({"err" : err.message , "errCode" : "SU-003"}) 
            }
        })
    })


})

//Login
router.post("/login", async (req , res ) => {
    const email = req.body.email
    const password = req.body.pwd
    console.log("New Login from : "+email)
    // console.log(email + " " + pwd)

    const constraint = {
        email : {
            presence: true,
            email : true
        },
        password : {
            presence : true,
            length : {
                minimum : 4,
                maximum : 16,
                tooShort : "is too short",
                tooLong : "is too long"
            }
        }
    }

    const validateRes = validate({email,password},constraint)

    if (validateRes != undefined){
        return res.json({message:"Validation error"})
    }

    const existUser = await Credential.findOne({email:email})
    //Check if the user is exist
    if (!existUser) return res.json({"message" : "Email does not exist"})
    //Get User to get the username later
    const user = await User.findOne({email})
    //Validate encrypted pass
    bcrypt.compare(password , existUser.pwd , (err, isMatch) => {
        if (err) return res.json({err})
        if (isMatch){ // if the pwd matches 
            // Sign the token
            const token = jwt.sign({email : email, name: user.name, role:existUser.role}, process.env.TOKEN_SECRET)
            //Put token in the header
            return res.header("auth-token",token).json({"message" : "Login Success", "token" : token})
        }else{ // if the pwd is not match
            return res.json({"message" : "Password entered is incorrect"})
        }
    })
})

//change password
router.post("/changePassword", verify , async (req , res ) =>  {
    email = req.user.email
    password = req.body.pwd
    newPassword = req.body.newPwd

    if (password == newPassword) {
        return res.json({"message" : "New password can't be the same to the previous password!", errCode : "CP-001"})
    }

    const constraint = {
        password : {
            presence : true,
            length : {
                minimum : 4,
                maximum : 16,
                tooShort : "is too short",
                tooLong : "is too long"
            }
        }
    }

    const validateRes = validate({password : password, password : newPassword},constraint)

    if (validateRes != undefined) {
        return res.json(validateRes)
    }

    const existUser = await Credential.findOne({email:email})

    bcrypt.compare(password , existUser.pwd , async (err, isMatch) => {
        if (err) return res.json({err})
        if (isMatch){ // if the pwd matches 
            // Generate new hash and pass it into database
            await bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newPassword, salt, async (err, hash) => {
                    if (err) return res.json({err})
                    try{
                        const result = await Credential.updateOne({email:email},{pwd:hash});
                        if (result.n >= 1){
                            return res.json({message : "Password changed as successfully!"})
                        }else{
                            return res.json({message : "Problem Occured during the process of changing password!", errCode : "CP-003"})
                        }  
                    }catch(err){
                        return res.json({err : err.message , errCode : "CP-004"}) 
                    }
                })
            })
        }else{ // if the pwd is not match
            return res.json({message : "Incorrect Password!", errCode : "CP-002"})
        }
    })

})

module.exports = router