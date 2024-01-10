const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc Get all users
// @route GET /users
// @access private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean()
    if (!users?.length) {
        return res.status(400).json({message: 'No users found'})
    }
    res.json(users)
})

// @desc Create new user
// @route POST /users
// @access private
const createNewUser = asyncHandler(async (req, res) => {
    const {username, password, active, balance, status, department} = req.body

    // Confirm data

    if(!username || !password || status == -1 || balance <= -1 || !Array.isArray(department) || !department.length || typeof active != 'boolean') {
        //console.log(!username, !password, status == -1, balance > -1, !Array.isArray(department), !department.length , typeof active != 'boolean')
        return res.status(400).json({message: 'All fields are required'})
    }

    //Check for duplicates

    const duplicate = await User.findOne({username}).lean().exec()

    if(duplicate) {
        return res.status(409).json({message: 'Duplicate username'})
    }

    //Hash password
    const hashedPwd = await bcrypt.hash(password, 10) //salt rounds

    const userObject = {username, "password": hashedPwd, active, balance, status, department}

    const user = await User.create(userObject)

    if (user) {
        res.status(201).json({message: `New user ${username} created`})
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }

})

// @desc Update user
// @route PATCH /users
// @access private
const updateUser = asyncHandler(async (req, res) => {
    const {id, username, password, active, balance, status, department} = req.body

    if(!id || !username || !password || status == -1 || balance <= -1 || !Array.isArray(department) || !department.length || typeof active != 'boolean') {
        return res.status(400).json({message: 'All fields are required'})
    }

    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({message: 'User not found'})
    }

    //Check for duplicate
    const duplicate = await User.findOne({ username }).lean().exec()
    //Allow updates
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username'})
    }

    user.username = username
    user.status = status
    user.active = active
    user.department = department
    user.balance = balance
    
    if (password) {
        // Hash password

        user.password = await bcrypt.hash(password, 10)
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} updated` })
})

// @desc Delete a user
// @route DELETE /users
// @access private
const deleteUser = asyncHandler(async (req, res) => {
    const {id }  = req.body

    if(!id) {
        return res.status(400).json({message: 'All fields are required'})
    }

    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({message: 'User not found'})
    }


    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} deleted`

    res.json({"message": reply} )


})


module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}