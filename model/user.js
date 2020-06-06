const mongoose = require('mongoose')
const Userschema = mongoose.Schema;

const UserSchema = Userschema({
    name : {
        require : true,
        type : String
    },
    email : {
        require : true,
        type : String
    },
    password : {
        require : true,
        type : String
    },
    password2 : {
        require : true,
        type : String
    },
    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('users',UserSchema);