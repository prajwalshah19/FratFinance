const express = require('express')

const router = express.Router()
const usersController = require('../controllers/budgetsController')

router.route('/')
    .get(usersController.getAllBudgets) // read
    .post(usersController.createNewBudget) //create
    .patch(usersController.updateBudget) // update
    .delete(usersController.deleteBudget) // delete

module.exports = router
