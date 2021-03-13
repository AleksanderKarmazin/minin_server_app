import mongoose from 'mongoose'

const adListSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    promo: {
        type: Boolean,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    flex: {
        type: Number,
        required: true,
        default: 4
    },

}, {
    timestamps: true
})


const ad_list = mongoose.model('ad_list', adListSchema);

export default ad_list;