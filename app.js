const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const expressLayout = require("express-ejs-layouts");
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
// Passport Config
require('./config/passport')(passport);

// const multer = require('multer');
// const ejs = require('ejs');
// const path = require('path');

// // Set The Storage Engine
// const storage = multer.diskStorage({
//   destination: './public/uploads',
//   filename: function(req, file, cb){
//     cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({
//   storage: storage,
//   limits:{fileSize: 1000000},
//   fileFilter: function(req, file, cb){
//     checkFileType(file, cb);
//   }
// }).single('myImage');

// module.exports.upload = upload

// function checkFileType(file, cb){
//   // Allowed ext
//   const filetypes = /jpeg|jpg|png|gif/;
//   // Check ext
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   // Check mime
//   const mimetype = filetypes.test(file.mimetype);

//   if(mimetype && extname){
//     return cb(null,true);
//   } else {
//     cb('Error: Images Only!');
//   }
// }


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setting EJS as templating engine
app.set("view engine", "ejs");
app.use(expressLayout);

// To connect to MongoDB Database
mongoose.connect(
 process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.log(err);
    else console.log("Connected to DB!");
  }
);


app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    expires : 36000
  })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use('/',require('./routes/index'))
app.use('/users',require('./routes/users'))

app.use(express.static('./public'));

app.listen(process.env.PORT || 3000, () => {
 console.log('server is running on 3000')
});
