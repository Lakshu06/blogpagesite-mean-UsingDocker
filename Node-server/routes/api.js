const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const errorHandler = require('../middleware/errorhandler');
var jsonwt = require('jsonwebtoken')
var key = require('../models/config')

router.post('/signup', async (req, res) => {
    var newUser = {};
    newUser.username = req.body.username;
    newUser.first_name = req.body.first_name;
    newUser.last_name = req.body.last_name;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    await User.findOne({ username: newUser.username })
        .then(profile => {
            if (profile) {
                res.status(401).json({
                    message: 'User already exist',
                    created: false
                })
            }
            else {
                const salt = bcrypt.genSaltSync(10)
                const password = newUser.password
                const user = new User({
                    username: newUser.username,
                    password: bcrypt.hashSync(password, salt),
                    first_name: newUser.first_name,
                    last_name: newUser.last_name,
                    email: newUser.email
                })
                user.save()
                res.status(200).json({
                    message: "User register successfully",
                    created: true
                })
                console.log(user)
            }

        })
        .catch(e => {
            console.log("Error is ", e);
            errorHandler(e, '', res, '')
        })
});




router.post("/login", async (req, res) => {
    var newUser = {};
    newUser.username = req.body.username;
    newUser.password = req.body.password;

    await User.findOne({ username: newUser.username })
        .then(candidate => {
            if (candidate) {
                bcrypt.compare(
                    req.body.password,
                    candidate.password,
                    async (err, result) => {
                        if (err) {
                            errorHandler(err, req, res, '')
                        } else if (result == true) {
                            const payload = {
                                id: candidate.id,
                                username: candidate.username,
                                first_name: candidate.first_name,
                                last_name: candidate.last_name,
                                email: candidate.email
                            };
                            jsonwt.sign(
                                payload,
                                key.secret,
                                { expiresIn: 3600 },
                                (err, token) => {
                                    res.json({
                                        success: true,
                                        id: payload.id,
                                        username: payload.username,
                                        first_name: payload.first_name,
                                        last_name: payload.last_name,
                                        email: payload.email,
                                        token: "Bearer " + token
                                    });
                                }
                            );
                        } else {
                            res.json({ message: "User Unauthorized Access" });
                        }
                    }
                )
            }
            else {
                res.send({ message: "user doesnt exist" });
            }

        })
        .catch(err => {
            console.log("Error is ", err.message);
            errorHandler(err, '', res, '')
        });
});

router.get('/logout', function (req, res, next) {
    req.logout();

})
module.exports = router;