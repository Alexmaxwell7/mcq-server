var mongoose = require('mongoose')
var quizSchema = mongoose.Schema({
    quizname: {
        type: String,
        required: true
    },
    quizdescription: {
        type: String,
        required: true
    },
    upload:{
        type: Boolean, default: false
    },
    staff: {
        type: String,
    },
    staffemail: {
        type: String,
    }
})
module.exports = mongoose.model('quiz',quizSchema)

