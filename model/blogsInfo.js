const mongoose = require('mongoose');

const Mongoosemodel = mongoose.Schema({
    title : {
        require:true,
        type : String
    },
    name : {
        require :true,
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

