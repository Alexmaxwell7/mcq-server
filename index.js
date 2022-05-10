const express = require('express');
const mongoose = require('mongoose');
const app= express();
const url = 'mongodb://localhost/Quiz'
const cors = require("cors");
app.use(cors())

mongoose.connect(url,{useNewUrlParser:true})
const con = mongoose.connection

con.on("open",()=>{
    console.log("Server Connected")
})
const server = require('http').Server(app);
const io = require('socket.io')(server,
    {
        cors:
        {
            origin: '*',
            methods: ["GET", "POST"],
            allowedHeaders: ["my-custom-header"],
            credentials: true
        }
    });
app.set('io', io);
io.on('connection', socket => {

    console.log("new  sockeet connection...");
    socket.emit("test event", "hey utsav");

});
app.use(express.json())
app.use('/', require('./router/api'))
app.use('/admin', require('./router/admin'))
app.use('/student', require('./router/student'))
app.use('/teacher', require('./router/teacher'))

app.listen(5000,()=>{
    console.log("server Started")
})


module.exports = app;

