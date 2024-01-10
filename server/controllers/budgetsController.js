const asyncHandler = require('express-async-handler')
const Budget = require('../models/Budget')

// @desc Get all budgets
// @route GET /budgets
// @access private
const getAllBudgets = asyncHandler(async (req, res) => {
    const budgets = await Budget.find().lean()
    if (!budgets?.length) {
        return res.status(400).json({message: 'No budgets found'})
    }
    res.json(budgets)
})

// @desc Create new budget
// @route POST /budgets
// @access private
const createNewBudget = asyncHandler(async (req, res) => {
    const {department, total, events} = req.body

    // Confirm data

    if(!department || total <= -1 || typeof events != 'object') {
        
        return res.status(400).json({message: 'All fields are required'})
    }

    //Check for duplicates

    const duplicate = await Budget.findOne({department}).lean().exec()

    if(duplicate) {
        return res.status(409).json({message:`Duplicate Budget for ${department} department.`})
    }

    const budgetObject = {department, total, events}


    const budget = await Budget.create(budgetObject)

    if (budget) {
        res.status(201).json({message: `New budget for ${department} department created`})
    } else {
        res.status(400).json({ message: 'Invalid data received' })
    }

})

// @desc Update budget
// @route PATCH /budgets
// @access private
const updateBudget = asyncHandler(async (req, res) => {
    const {id, department, total, events} = req.body

    // Confirm data

    if(!id || !department || total <= -1 || typeof events != 'object') {
        
        return res.status(400).json({message: 'All fields are required'})
    }

    const budget = await Budget.findById(id).exec()

    //Check for duplicates

    const duplicate = await Budget.findOne({department}).lean().exec()

    //Allow updates
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate department'})
    }



   budget.department = department
   budget.total = total
   budget.events = events

   const updatedBudget = await budget.save()

   res.json({ message: `${updatedBudget.department} budget updated` })

})

// @desc Delete a budget
// @route DELETE /budgets
// @access private
const deleteBudget = asyncHandler(async (req, res) => {
    const {id }  = req.body

    if(!id) {
        return res.status(400).json({message: 'All fields are required'})
    }

    const budget = await Budget.findById(id).exec()

    if (!budget) {
        return res.status(400).json({message: 'Budget not found'})
    }


    const result = await budget.deleteOne()

    const reply = `Budget for ${result.department} department with ID ${result._id} deleted`

    res.json({"message": reply} )


})


module.exports = {
    getAllBudgets,
    createNewBudget,
    updateBudget,
    deleteBudget
}

