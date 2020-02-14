const User = require('../models/user')
const Credential = require('../models/credential')
const Streaming = require('../models/streaming')
const uID = require("../utilities/UniqueCode")
const axios = require('axios')

class StreamService {
    async startStream({owner,ownerName},{ streamTitle, description, isPrivate, password }){
        console.log(`${owner} ${ownerName}`)
        return new Promise(async(resolve,reject)=>{
            const user = await User.findOne({ email: owner })
            if (user.isStreaming) resolve({ "message": "Stream is already initialized", "errCode": "SS-001" })
            else await User.updateOne({ email: owner }, { isStreaming: true })
            try {
                var streamCode = null
                var isNotUnique = null 
                do {
                    streamCode = uID(12)
                    isNotUnique = await Streaming.findOne({ streamCode })
                } while (isNotUnique)
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
                await User.updateOne({ email: owner }, { isStreaming: true })
                //await axios.post('http://10.10.15.11:4000/createRoom', { roomName: streamTitle, roomOwner: owner, roomId: streamCode }).catch(er => console.log(er))
                console.log("done")
                resolve({ streamCode: savedStream.streamCode, streamTitle: savedStream.streamTitle, Description: savedStream.Description })
            } catch (err) {
                console.log(err)
                resolve(err)
            }
        })

    }
    async deviceStartStream({deviceEmail,deviceName},{ streamTitle, description, isPrivate, password, streamBy }){
        return new Promise(async (resolve,reject)=>{
            const _U = await User.findOne({ email: streamBy })
            try {
                var streamCode = null
                var isNotUnique = null
                do {
                    streamCode = uID(12)
                    isNotUnique = await Streaming.findOne({ streamCode })
                } while (isNotUnique)
        
                const newStream = new Streaming({
                    streamCode,
                    streamTitle,
                    description,
                    isPrivate,
                    streamFrom: deviceName,
                    password,
                    owner: streamBy,
                    ownerName: _U.name,
                    streamFrom: deviceEmail
                })
                const savedStream = await newStream.save()
                await User.updateOne({ email: streamBy }, { currentStream: streamCode, isStreaming: true })
                //await axios.post('http://10.10.15.11:4000/createRoom',{roomName:streamTitle,roomId:streamCode}).catch(er => console.log(er))
                //axios.post('http://10.10.17.15:3001/redirect', { streamBy, streamCode }).catch((er) => console.log(er))
                resolve({ streamCode: savedStream.streamCode, streamTitle: savedStream.streamTitle, Description: savedStream.Description })
        
        
            } catch (err) {
                resolve(err)
            }
        })
    }
    async joinStream({email,name},{streamCode,password}){
        return new Promise(async (resolve,reject)=>{
            const domain = 'meet.jit.si';
            try {
                //Get stream info
                const theStream = await Streaming.findOne({ streamCode });
                // Check Stream status
                if (!theStream.isActive) resolve({ message: "Stream is not currently available", errCode: "ST-001" })
                // Check Stream privacy
                if (!theStream.isPrivate) {
                    if (!password.equals("") && password.equals(null)) {
                        if (!theStream.password.equals(password)) {
                            resolve({ message: "Incorrect password", errCode: "ST-002" })
                        }
                    } else {
                        return resolve({ message: "Password is required", errCode: "ST-003" })
                    }
                }
                // Check ownership
                if ((theStream.owner === email && theStream.streamFrom == "Author's cam") || (theStream.streamFrom === email)) { // Owner
                    // For Streamer/Lecturer
                    const interfaceConfigLecturer = {
                        TOOLBAR_BUTTONS: [
                            'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
                            'fodeviceselection', 'profile', 'recording', "shortcuts",
                            'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
                            'videoquality', 'filmstrip', 'stats', 'shortcuts',
                            'tileview', 'videobackgroundblur', 'download', 'help', 'info'
                        ],
                        SETTINGS_SECTIONS: ['devices', 'language', 'moderator'],
                        SHOW_JITSI_WATERMARK: false,
                        SHOW_WATERMARK_FOR_GUESTS: false,
                        channelLastN: 1,
                        VERTICAL_FILMSTRIP: true,
                        SET_FILMSTRIP_ENABLED: false
        
                    }
                    const options = {
                        roomName: streamCode,
                        interfaceConfigOverwrite: interfaceConfigLecturer,
                        userInfo: {
                            email: email
                        },
                        channelLastN: 1,
                    }
                    if (theStream.streamFrom !== email) await User.updateOne({ email }, { isStreaming: true })
                    resolve({ options: options, domain: domain, role: "Lecturer", name: name, isStreaming: true })
                } else { // Not-Owner
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
                        SET_FILMSTRIP_ENABLED: false
        
                        // filmStripOnly: true
                    }
                    const optionsStudents = {
                        roomName: streamCode,
                        interfaceConfigOverwrite: interfaceConfigStudent,
                        userInfo: {
                            email: email
                        },
                        channelLastN: 1,
                    };
                    // Send Back Data Lah
                    resolve({ options: optionsStudents, domain: domain, role: "Student", name: name })
                }
        
            } catch (err) {
                resolve({ err })
            }
        })
    }
    async stopStream(owner){
        return new Promise(async (resolve,reject)=>{
            try {
                // Find the stream and set the active state to false
                const result = await Streaming.updateMany({ owner, isActive: true }, { isActive: false })
                console.log(result)
                if (result.n >= 1) {
                    // Set isStreaming state of User to false
                    const result2 = await User.updateOne({ email: owner }, { isStreaming: false })
                    console.log(result2)
                    if (result2.n >= 1) {
                        console.log("done")
                        resolve({ message: "Stop your current stream as successfully!", status: true })
                    } else {
                        resolve({ message: "Problem Occured during stop streaming process", status: false })
                    }
                } else {
                    resolve({ message: "Problem Occured during stop streaming process", status: false })
                }
        
            } catch (err) {
                resolve(err)
            }
        })
    }
    async getCurrentStreams(limit){
        return new Promise(async (resolve,reject)=>{
            try {
                const currentlyStreamings = await Streaming.find({ isActive: true }).limit(limit).sort({ date: -1 });
                resolve(currentlyStreamings)
            } catch (err) {
                resolve(err)
            }
        })
    }
    async getStreamDetail({streamCode}){
        return new Promise(async (resolve,reject)=>{
            try {
                const theStream = await Streaming.findOne({ streamCode })
                resolve({
                    streamCode: theStream.streamCode,
                    streamTitle: theStream.streamTitle,
                    description: theStream.description,
                    ownerName: theStream.ownerName
                })
            } catch (err) {
                resolve(err)
            }
        })
    }
    async editStream({streamCode,streamTitle,description},{role,email}){
        return new Promise(async(resolve,reject)=>{
            if (role != "Admin") resove({"message" : "You are not authorized for the following operation!", "errCode" : "CS-001"})
            {
                const result = await Streaming.updateOne({streamCode},{streamTitle,description})
                if (result.n >= 1)resolve({"message" : "Successfully update the stream's data!"})
                else  resolve({"message" : "An error occured during the process! Failed to update the stream's data!", "errCode" : "CS-002"})
            }
        })
    }
}
module.exports = StreamService