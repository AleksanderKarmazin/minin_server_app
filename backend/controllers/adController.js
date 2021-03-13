import express from 'express'
import asyncHandler from 'express-async-handler'

import AdList from './../models/adModel.js';
// import ProductSeeds from './../models/productSeedModel.js';

// @desc    Fetch all ad
// @rout    GET /ad
// @access  public
const getAd = asyncHandler(async (req, res) => {
    const adList = await AdList.find({})
    res.json(adList);
})

// @desc    Fetch ad by id
// @rout    GET /ad/:id
// @access  public
const getAdById = asyncHandler(async (req, res) => {
    const adList = await AdList.findById(req.params.id);

    if (adList) {
        res.json(adList);
    } else {
        res.status(404)
        throw new Error('Seed not Found')
    }
})

// @desc    Delete Ad
// @rout    DELETE /ad/:id
// @access  
const deleteAd = asyncHandler(async (req, res) => {
    const adList = await AdList.findById(req.params.id);

    if (adList) {
        adList.remove()
        res.json({ message: "Product removed" });
    } else {
        res.status(404)
        throw new Error('Seed not Found')
    }
})

// @desc    Create Ad
// @rout    POST /ad/
// @access  
const createAd = asyncHandler(async (req, res) => {
    const {title, description, promo, image, flex} = req.body
    
    const adList = new AdList({
        user: req.user._id,
        // title: req.body.title,
        title: title,
        description: description,
        promo: promo,
        image: image,
        flex: flex
    })


    const createdAd = await adList.save()
    res.status(201).json(createdAd)
})

// @desc    Update Product Seed
// @rout    PUT /seeds/:id
// @access  
const updateAd = asyncHandler(async (req, res) => {
    const {title, description, promo, image, flex} = req.body


    const updateAdList = await AdList.findById(req.params.id)

    if (updateAdList) {

        updateAdList.title = title
        updateAdList.promo = promo
        updateAdList.image = image
        updateAdList.description = description
        updateAdList.flex = flex

        const updatedAd = await updateAdList.save()
        res.status(201).json(updatedAd)
    } else {
        res.status(401)
        throw new Error('Product not found')
    }
})



export {
    getAd,
    getAdById,
    deleteAd,
    createAd, 
    updateAd
}