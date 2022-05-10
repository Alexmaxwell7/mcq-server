const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.getCheck = (req, res, next) => {
    res.json({ msg: "All ok" })
}

exports.registerStudent = async (req, res) => {
    var user = new User({
        contact: req.body.contact,
        email: req.body.email,
        role: "student",
        password: await bcrypt.hash(req.body.password,12)
        // password:req.body.password
    });
    User.find({ email: req.body.email }, (err, users) => {

        if (err) {
            console.log("err in finding email ");
            res.json({ msg: "some error!" });
        }
        if (users.length != 0) {
            console.log("already user with this email");
            res.json({ msg: "already user exist with this email!" });
        }
        else {
            user.save((error, registeredUser) => {
                if (error) {
                    console.log(error);
                    res.json({ msg: "some error!" });
                }
                else {
                    let payload = { subject: registeredUser._id }
                    let token = jwt.sign(payload, 'secretkey')
                    res.status(200).json({ token: token })
                }
            })
        }
    })
}


exports.registerTeacher = async (req, res) => {
    var user = new User({
        contact: req.body.contact,
        email: req.body.email,
        role: "teacher",
        password: await bcrypt.hash(req.body.password,12)
    });
    User.find({ email: req.body.email }, (err, users) => {

        if (err) {
            console.log("err in finding email ");
            res.json({ msg: "some error!" });
        }
        if (users.length != 0) {
            console.log("already user with this email");
            res.json({ msg: "already user exist with this email!" });
        }
        else {
            user.save((error, registeredUser) => {
                if (error) {
                    console.log(error);
                    res.json({ msg: "some error!" });
                }
                else {
                    let payload = { subject: registeredUser._id }
                    let token = jwt.sign(payload, 'secretkey')
                    res.status(200).json({ token: token })
                }
            })
        }
    })
}

exports.logIn = (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            console.log(err)
            res.json({ msg: "Somthing went wrong" });
        }
        else {
            if (!user) {
                res.json({ msg: 'Invalid Email!!' })
            }
            else {
                bcrypt.compare(req.body.password, user.password).then(match => {
                    if (match) {
                        console.log("login sucesssss");
                        let payload = { subject: user._id,email:user.email }
                        let token = jwt.sign(payload, 'secretkey')
                        res.status(200).json({ token: token, role: user.role, blocked: user.blocked })
                    }
                    else {
                        console.log("incoreect passss");
                        res.json({ msg: 'Incorrect password!!' })
                    }
                }).catch(err => {
                    console.log("somthing wrong");
                    res.json({ msg: 'Somthing went wrong' })
                })
            }
        }
    })
}




exports.testDone = (req, res, next) => {
    console.log("success submit");
    console.log(req.body);
    res.json({ msg: "yours mark" });
}

exports.verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send("unauthorized req")
    }
    let token = req.headers.authorization.split(' ')[1]
    // console.log(token);
    if (token == 'null') {
        return res.status(401).send("unauthorized req")
    }
    let payload = jwt.verify(token, 'secretkey')
    if (!payload) {
        return res.status(401).send("unauthorized req")
    }
    req.userId = payload.subject
    req.email = payload.email;
    next()
}

