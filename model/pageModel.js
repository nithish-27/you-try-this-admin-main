const mongoose = require('mongoose');

const pageSchema  = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please enter Jwellery name'],
        trim: true,
        maxLength: [100, 'Jwellery name cannot exceed 100 characters']
    },
    description:{
        type: String,
        required: [true, 'Please enter Jwellery description']
    },
    category:{
        type: String,
        required: [true, 'Please select category for this Jwellery '],
        enum:{
            values: [
                'Gold',
                'Silver',
                'Platinum',
                'Bronze'
            ],
            message: 'Please select correct category for product'
        }
    },
    gender:{
        type: String,
        required: [true, 'Please Select Gender'],
    },
    price: {
        type: Number,
        required: [true, 'Please enter Jwellery Price']
    },
    ratings: {
        type: Number,
        default: 0
    },
    mobileno:{
        type: Number,
        required: [true, 'Please enter Mobile No.']
    },
    images1: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
    images2: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
    images3: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ]

})

 module.exports = mongoose.model('pageTable', pageSchema)
