const {Schema, model} = require('mongoose');

const amm2Schema = new Schema({ 
    LPN:{
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    Subcategory:{
        type: String,
        trim: true
    },
    Price:{
        type: String,
        trim: true
    }
});

const AMM2 = model('AMM2', amm2Schema);

module.exports = AMM2;