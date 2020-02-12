const express = require('express')
const axios = require('axios')
const router = express.Router()
const User = require("../models/user")
const uID = require("../utilities/UniqueCode")
const verify = require("../utilities/VerifyToken")
const Streaming = require('../models/streaming')


// Get all user info
router.get("/allUser", verify , async (req, res) => {
    const role = req.user.role
    const email = req.user.email
    adminReg = /admin/i
    if (adminReg.test(role)){
        users = await User.find({email : {$ne : email} })
        return res.json(users);
    }else{
        return res.json({message : "You are not authorized!", errCode : "AU-001"})
    }
})

// Get user Info
router.get("/user", verify , async (req, res) => {
    const email = req.user.email
    const user = await User.findOne({email})
    const {name,isStreaming} = user
    const _user = {
        email,
        name,
        isStreaming,
        role:req.user.role
    }
    return res.json(_user)
})

// Changer user role
router.get("/changeRole", verify, async(req, res) => {
    email = req.user.email
    role = req.user.role
    targetUser = req.body.email
    targetRole = req.body.role

    roleReg = /admin/i

    if (roleReg.test(role)){
        update = await Credential.updateOne({role : targetRole},{email : targetUser})
        if (update.n > 0){
            return res.json({"message" : "Success fully update user '" + targetUser + "' to '"+ targetRole +"'" })
        }else{
            return res.json({"messgage" : "An error occurred during role changing process"})
        }
    }else{
        return res.json({"message" : "You are not authorized to performed the following task", "errCode":"CR-001"})
    }
})

// Start stream
router.post("/startStream", verify, async (req, res) => {
    console.log("start")
    const owner = req.user.email
    const ownerName = req.user.name
    const {streamTitle,description,isPrivate,password} = req.body
    try{
        console.log("tryingggg")
        var streamCode = null
        var isNotUnique = null

        do{
            streamCode = uID(12)
            isNotUnique = await Streaming.findOne({streamCode})
        }while(isNotUnique)

        const newStream = new Streaming({
            streamCode,
            streamTitle,
            description,
            isPrivate,
            password,
            owner,
            ownerName
        })
        const savedStream = await newStream.save()
        await User.updateOne({email:owner},{isStreaming : true})
        await axios.post('http://10.10.17.15:4000/createRoom',{roomName:streamTitle,roomOwner:owner,roomId:streamCode}).catch(er => console.log(er))
        console.log("done")
        return res.json({streamCode : savedStream.streamCode,streamTitle : savedStream.streamTitle, Description : savedStream.Description})
    }catch (err){
        console.log(err)
        return res.json(err)
    }
})

// Device start stream
router.post('/deviceStartStream',verify,async(req,res)=>{
    console.log("device start")
    console.log(req.body)
    const deviceEmail = req.user.email
    const {streamTitle,description,isPrivate,password,streamBy} = req.body
    const _U = await User.findOne({email:streamBy})
    try{
        var streamCode = null
        var isNotUnique = null
        do{
            streamCode = uID(12)
            isNotUnique = await Streaming.findOne({streamCode})
        }while(isNotUnique)

        const newStream = new Streaming({
            streamCode,
            streamTitle,
            description,
            isPrivate,
            password,
            owner:streamBy,
            ownerName:_U.name,
            streamFrom:deviceEmail
        })
        const savedStream = await newStream.save()
        await User.updateOne({email:streamBy},{currentStream:streamCode,isStreaming:true})
        await axios.post('http://10.10.17.15:4000/createRoom',{roomName:streamTitle,roomOwner:streamBy,roomId:streamCode}).catch(er => console.log(er))
        await axios.post('http://10.10.17.15:3001/redirect',{streamBy,streamCode}).catch((er)=> console.log(er))
        console.log("doneeee")
        return res.json({streamCode : savedStream.streamCode,streamTitle : savedStream.streamTitle, Description : savedStream.Description})


    }catch (err){
        console.log(err)
        return res.json(err)
    }
})

// Join Stream
router.post("/joinStream", verify, async(req,res) => {
    const email = req.user.email
    const name = req.user.name
    const streamCode = req.body.streamCode
    const password = req.body.pwd
    const domain = 'meet.jit.si';
    
    try{
        //Get stream info
        const theStream = await Streaming.findOne({streamCode});
        // Check Stream status
        if (!theStream.isActive){
            return res.json({message : "Stream is not currently available", errCode : "ST-001"})
        }
        // Check Stream privacy
        if (!theStream.isPrivate){
            if (!password.equals("") && password.equals(null)){
                if(!theStream.password.equals(password)){
                    return res.json({message : "Incorrect password", errCode : "ST-002"})
                }
            }else{
                return res.json({message : "Password is required", errCode : "ST-003"})
            }     
        }

        // Check ownership
        if ((theStream.owner === email && theStream.streamFrom == 'none') || (theStream.streamFrom === email)){ // Owner
            // For Streamer/Lecturer
            const interfaceConfigLecturer = {
                TOOLBAR_BUTTONS: [
                    'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
                    'fodeviceselection', 'profile',  'recording',"shortcuts",
                     'etherpad', 'sharedvideo', 'settings', 'raisehand',
                    'videoquality', 'filmstrip', 'stats', 'shortcuts',
                    'tileview', 'videobackgroundblur', 'download', 'help'
                ],
                SETTINGS_SECTIONS: ['devices', 'language', 'moderator'],
                SHOW_JITSI_WATERMARK: false,
                SHOW_WATERMARK_FOR_GUESTS: false,
                channelLastN: 1,
                VERTICAL_FILMSTRIP: true,
                SET_FILMSTRIP_ENABLED: false,
                MOBILE_APP_PROMO: false,
                SHOW_CHROME_EXTENSION_BANNER: false
            }
            const options = {
                roomName: streamCode,
                interfaceConfigOverwrite : interfaceConfigLecturer,
                userInfo : {
                email : email
                },
                channelLastN: 1,
            }
            if(theStream.streamFrom !== email) await User.updateOne({email},{isStreaming : true})
            return res.json({options : options, domain : domain, role : "Lecturer", name : name, isStreaming : true})
        }else{ // Not-Owner
            // For Stream Participant - *Not Class Owner*
            const interfaceConfigStudent = {
                TOOLBAR_BUTTONS: [
                    'closedcaptions', 'fullscreen',
                     'settings', 'raisehand',
                ],
                SETTINGS_SECTIONS: ['language'],
                SHOW_JITSI_WATERMARK: false,
                SHOW_WATERMARK_FOR_GUESTS: false,
                VERTICAL_FILMSTRIP: false,
                SET_FILMSTRIP_ENABLED: false,
                MOBILE_APP_PROMO: false,
                DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
                DISABLE_PRESENCE_STATUS: true,
                SHOW_CHROME_EXTENSION_BANNER: false
                // filmStripOnly: true
            }
            const optionsStudents = {
                roomName: streamCode,
                interfaceConfigOverwrite : interfaceConfigStudent,
                userInfo : {
                email : email
                },
                channelLastN: 1,
        };
            // Send Back Data Lah
            return res.json({options : optionsStudents, domain : domain, role : "Student", name : name})
        }
        
    }catch(err){
        return res.json({err})
    }

})

// Stop stream
router.get("/stopStream", verify, async (req, res) => {
    const owner = req.user.email
    const _S = await Streaming.findOne({owner})
    try{
        // Find the stream and set the active state to false
        const result = await Streaming.updateOne({ owner , isActive : true },{ isActive : false, currentStream:"none" })
        if (result.n >= 1){
            // Set isStreaming state of User to false
            const result2 = await User.updateOne({email:owner},{isStreaming : false})
            if (result2.n >= 1){
                return res.json({message : "Stop your current stream as successfully!", status : true})
            }else{
                return res.json({message : "Problem Occured during stop streaming process", status : false})
            }           
        }else{
            return res.json({message : "Problem Occured during stop streaming process", status : false})
        }

    }catch(err){
        return res.json(err)
    }
    //await axios.post('http://10.10.15.11:4000/deleteRoom',{roomId:_S.streamCode}).catch(err => console.log(err))
})

// Get currently stream of all class participated
router.post("/getCurrentlyStream", verify , async (req, res) => {
    var limit = req.body.limit == null ? 0 : req.body.limit
    try{
        const currentlyStreamings = await Streaming.find({isActive : true}).limit(limit).sort({date: -1});
        return res.json(currentlyStreamings)
    }catch(err){
        return res.json(err)
    }
})

// Get offline stream
router.post("/getOfflineStream", verify , async (req, res) => {
    var limit = req.body.limit == null ? 0 : req.body.limit
    try{
        const offlineStreamings = await Streaming.find({isActive : false}).limit(limit).sort({date: -1});
        return res.json(offlineStreamings)
    }catch(err){
        return res.json(err)
    }
})

// Get stream by author
router.post("/getStreamByAuthor", verify, async (req,res) => {
    const {author} = req.body
    var limit = req.body.limit == null ? 0 : req.body.limit
    const name = author.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
    const emailReg = new RegExp(name + ".{0,}", "i")
    console.log(emailReg)
    try{
        const streamByAuthor = await Streaming.find({ownerName : { $regex : emailReg } }).limit(limit).sort({date: -1});
        console.log(streamByAuthor)
        return res.json(streamByAuthor)
    }catch(err){
        return res.json(err)
    }
})

// Get Stream Detials
router.post("/getStreamDetail", verify , async (req, res) => {
    const streamCode = req.body.streamCode
    try{
        const theStream = await Streaming.findOne({streamCode})
        return res.json({
            streamCode : theStream.streamCode,
            streamTitle : theStream.streamTitle,
            description : theStream.description,
            ownerName : theStream.ownerName
        })
    }catch(err){
        return res.json(err)
    }

})

module.exports = router