
import express from 'express'
const router = express.Router()

import { 
    getNewRouter 
} from '../controllers/newRouter.js'
import { protect, admin } from '../middleware/authMiddleware.js'





router
    .route('/new')
    .get(protect, getNewRouter)

export default router