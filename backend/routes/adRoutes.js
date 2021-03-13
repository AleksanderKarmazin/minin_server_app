import express from 'express'
const router = express.Router()

import {
    getAd,
    getAdById,
    deleteAd,
    createAd, 
    updateAd,
} from '../controllers/adController.js'

import { protect, admin } from '../middleware/authMiddleware.js'

router
    .route('/ad')
    .get(getAd)
    .post(protect, createAd)


router
    .route('/ad/:id')
    .get(getAdById)
    .delete(deleteAd)
    .put(updateAd)



export default router
