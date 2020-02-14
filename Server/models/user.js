const mongoose = require('mongoose');

const schema = mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    name : {
        type : String,
        require : true
    },
    role : {
        type : String,
        default : "Student"
    },
    isStreaming : {
        type : Boolean,
        default : false
    }
})


module.exports = mongoose.model('Users', schema)