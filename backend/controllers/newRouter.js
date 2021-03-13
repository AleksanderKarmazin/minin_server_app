import asyncHandler from 'express-async-handler'

// @desc    GET user profile
// @rout    GET /api/users/profile
// @access  Private
const getNewRouter = (req, res) => {
    res.json({
        
        message: 'I say : "Hi from authentick router"',
       
    })
}

export {
    getNewRouter,
}