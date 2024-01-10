const mongoose = require('mongoose')


const transactionSchema = new mongoose.Schema({

    department: {
        type: String,
        default: 0
    },

    amount: {
        type: Number,
        required: true
    },
    catergory: {
        type: String,
        default: 0
    },
    memo: {
        type: String,
        default: 0
    },
    timestamps: true 


})

module.exports = mongoose.model('Transaction', transactionSchema)