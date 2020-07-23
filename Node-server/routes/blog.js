const express = require('express');
const router = express.Router();
var Blog = require('../models/blog');
var User = require('../models/user');
var path = require("path")
errorHandler = require('../middleware/errorhandler')

// routes
router.post('/create', async (req, res) => {
    var candidate = await User.findOne({
        username: req.body.username

    });
    var newblog = new Blog(req.body);
    if (candidate) {
        newblog.save();
        res.json({
            data: newblog,
            message: "blog Created ",
        })

    }
    else {
        res.send({ message: "username  doesnot exist ...please login first to write any blog" })
    }

});

router.delete('/:id', async (req, res) => {
    console.log(req.params);
    Blog.findByIdAndRemove({ _id: req.params.id }).then(function (blog) {
        blog = { data: [] };
        res.send({ post: blog });
    }).catch(function (err) {
        console.log(err);
        errorHandler(err, '', res, '')
    })
});

router.get('/get', async (req, res) => {
    Blog.find({}).then(function (blogList) {
        res.json({ post: blogList });

    }).catch(err => {
        errorHandler(err, '', res, '')
    })

});
// router.get('/create', async (req, res) => {
//     res.render('blogcreate')

// });


module.exports = router;