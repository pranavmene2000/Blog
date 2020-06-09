const express = require('express')
const sam = require('../model/blogsInfo')
const user = require('../model/user')
const router = express.Router();
const { upload } = require('../app')
const { ensureAuthenticated } = require('../config/auth')

router.get('/create', (req, res) => {
    res.render('createform')
})

// router.get('/editpost',(req,res) => {
//     res.render('edit',{post : post})
// })

router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        const getdata = await sam.find({}).sort('-date');
        // res.json(getdata)
        if (getdata.length == 0) {
            console.log('No Data Found In DB !');
            res.render('index', { Data: getdata, user: req.user, error: 'No blog found !' });
        }
        else {
            res.render('index', { Data: getdata, user: req.user });
        }

    } catch (err) {
        res.json({ message: err });
    }
})

router.post('/new', async (req, res) => {
    const Post = new sam({
        body: req.body.body,
        name: req.body.name,
        title: req.body.title,
        date: req.body.date
    })

    // upload(req, res, (err) => {
    //     if(err){
    //       res.render('createform', {
    //         msg: err
    //       });
    //     } else {
    //       if(req.file == undefined){
    //         res.render('createform', {
    //           msg: 'Error: No File Selected!'
    //         });
    //       } else {
    //           console.log(req.file)
    //         res.render('index', {
    //           file: `uploads/${req.file.filename}`
    //         });
    //       }
    //     }
    //   });

    try {
        const result = await Post.save();
        res.redirect('/')
    } catch (err) {
        res.json({ message: err });
    }

})

router.get('/view/:para', ensureAuthenticated, async (req, res) => {
    try {
        const PA = await sam.findById(req.params.para);
        res.render('viewpost', { data: PA })
    } catch (err) {
        res.json({ message: err });
    }
})

router.get('/delete/:parID', async (req, res) => {
    try {
        const ABC = await sam.findByIdAndRemove(req.params.parID);
        res.redirect('/')
    } catch (err) {
        res.json({
            err
        })
    }
})

// router.get('/edit/:id', async (req, res) => {
//     const post = await sam.findById(req.params.id)
//     res.render('edit', { post: post })
// })

router.get('/edit/:id', async (req, res) => {
    await sam.findById(req.params.id, function (err, result) {
        if (err) {
            console.log({ Error: err })
        }
        else {
            console.log(result)
            // window.alert('Are You Sure ?')
            res.render('edit', { post: result })
        }
    })
})

router.post('/edit/:id', async (req, res) => {

    // const mydata = {
    //     title: req.body.title,
    //     body: req.body.body,
    //     date: req.body.date,
    //     name: req.body.name
    // }

    await sam.update({ _id: req.params.id }, { $set: { body: req.body.body, date: req.body.date } }, function (err, result) {
        if (err) {
            console.log({ Error: err });
            res.render('edit')
        }
        else {
            console.log(result);
            res.redirect('/');
        }
    })
})


////////////////////    ******_TIMEPASS_******   Authentication Details /////////////////////

router.get('/search', async (req, res) => {
    await user.find({}).sort('-date')
        .then((user) => {
            if (user) {
                res.json(user)
            } else {
                res.json('Some error is occurs during Finding Data')
            }
        })
})

router.get('/search/:id', async (req, res) => {
    await user.findById(req.params.id)
        .then((user) => {
            if (user) {
                res.json(user).send('user is found')
            } else {
                res.json('User Is Not Found')
            }
        })
})

router.delete('/del/:id', async (req, res) => {
    await user.findByIdAndDelete(req.params.id)
        .then((user) => {
            if (user) {
                res.json(user).send('user is deleted Successfully')
            } else {
                res.json('User Is not found')
            }
        })
})

module.exports = router;