const express = require('express')

const router = express.Router()
const usersController = require('../controllers/transactionsController')

router.route('/')
    .get(usersController.getAllTransactions) // read
    .post(usersController.createNewTransaction) //create
    .patch(usersController.updateTransaction) // update
    .delete(usersController.deleteTransaction) // delete

module.exports = router
