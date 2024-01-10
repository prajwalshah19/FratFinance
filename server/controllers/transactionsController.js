const asyncHandler = require('express-async-handler')
const transaction = require('../models/Transaction')

// @desc Get all transactions
// @route GET /transactions
// @access private
const getAllTransactions = asyncHandler(async (req, res) => {
    const transactions = await Transaction.find().lean()
    if (!transactions?.length) {
        return res.status(400).json({message: 'No transactions found'})
    }
    res.json(transactions)
})



// @desc Create new transaction
// @route POST /transactions
// @access private
const createNewTransaction = asyncHandler(async (req, res) => {
    const {department, amount, catergory, memo} = req.body

    // Confirm data

    if(!department || amount <= -1 || !catergory || !memo) {
        
        return res.status(400).json({message: 'All fields are required'})
    }

    //Check for duplicates


    const transactionObject = {department, amount, catergory, memo}


    const transaction = await Transaction.create(transactionObject)

    if (transaction) {
        res.status(201).json({message: `New transaction for ${department} department created\nMemo: ${memo}`})
    } else {
        res.status(400).json({ message: 'Invalid data received' })
    }

})

// @desc Update transaction
// @route PATCH /transactions
// @access private
const updateTransaction = asyncHandler(async (req, res) => {
    const {id, department, amount, catergory, memo} = req.body

    // Confirm data

    if(!id, !department || amount <= -1 || !catergory || !memo) {
        
        return res.status(400).json({message: 'All fields are required'})
    }

    const transaction = await Transaction.findById(id).exec()

    const transactionObject = {id, department, amount, catergory, memo}


   transaction.department = department
   transaction.amount = amount
   transaction.catergory = catergory
   transaction.memo = memo

   const updatedTransaction = await transaction.save()

   res.json({ message: `${updatedTransaction.department} transaction updated` })

})

// @desc Delete a transaction
// @route DELETE /transactions
// @access private
const deleteTransaction = asyncHandler(async (req, res) => {
    const {id }  = req.body

    if(!id) {
        return res.status(400).json({message: 'All fields are required'})
    }

    const transaction = await Transaction.findById(id).exec()

    if (!transaction) {
        return res.status(400).json({message: 'transaction not found'})
    }


    const result = await transaction.deleteOne()

    const reply = `transaction for ${result.department} department with ID ${result._id} deleted`

    res.json({"message": reply} )


})


module.exports = {
    getAllTransactions,
    createNewTransaction,
    updateTransaction,
    deleteTransaction
}
