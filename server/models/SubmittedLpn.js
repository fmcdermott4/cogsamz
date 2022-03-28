const {Schema, model} = require('mongoose');

const submittedLpnSchema = new Schema({ 
    LPN:{
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    Subcategory:{
        type: String,
        trim: true,
        required: true
    },
    SubmittedDate:{
        type:Date,
        required: true
    },
    Price:{
        type: String,
        trim: true,
        required: true
    },    
    FunctionTestChecked:{
        type: Boolean,
        default: true
    },
    CleaningChecked:{
        type: Boolean,
        default: false
    },
    ReboxChecked:{
        type: Boolean,
        default: false
    },
    KittingChecked:{
        type: Boolean,
        default: false
    },
    PartsChecked:{
        type: Boolean,
        default: false
    },
    FunctionTest:{
        type: String,
        trim: true
    },
    Cleaning:{
        type: String,
        trim: true
    },
    Rebox:{
        type: String,
        trim: true
    },
    Parts:{
        type: String,
        trim: true
    }
});

const SubmittedLpn = model('SubmittedLpn', submittedLpnSchema);

module.exports = SubmittedLpn;