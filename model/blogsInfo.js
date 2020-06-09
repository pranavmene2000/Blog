const mongoose = require('mongoose');

const Mongoosemodel = mongoose.Schema({
    title : {
        type : String
    },
    name : {
        type : String
    },
    body : {
        require : true,
        type : String
    },
    date : {
        type : Date,
        require : true
    }
    // image : {
    //     type : String,
    //     require : true
    // }
})

module.exports = mongoose.model('MyModelNew',Mongoosemodel);

