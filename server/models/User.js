const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    status: {
        type: Number,
        default: 0
    },
    department: [{
        type: String,
        default: 0
    }],
    balance: {
        type: Number,
        default: 0
    },
})

module.exports = mongoose.model('User', userSchema)