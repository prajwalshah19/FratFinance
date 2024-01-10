const mongoose = require('mongoose')


const budgetSchema = new mongoose.Schema({

    department: {
        type: String,
        default: 0
    },

    total: {
        type: Number,
        required: true
    },

    events: {
        type: Object,
        required: true
    }


})

module.exports = mongoose.model('Budget', budgetSchema)