const {Schema, model} = require('mongoose');

const submittedLpnSchema = new Schema({ 
    LPN:{
        type: Schema.Types.ObjectId,
        ref: "AMM2",
        required: true,
    },
    User:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },    
    SubmittedDate:{
        type:Date,
        required: true,
        default: Date.now
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
        required: true,
        trim: true
    },
    Cleaning:{
        type: String,
        required: true,
        trim: true
    },
    Rebox:{
        type: String,
        required: true,
        trim: true
    },
    Parts:{
        type: String,
        required: true,
        trim: true
    },
    Kitting:{
        type: String,
        trim: true,
        default: "2"
    }
});

const SubmittedLpn = model('SubmittedLpn', submittedLpnSchema);

module.exports = SubmittedLpn;