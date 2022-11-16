const {Schema, model} = require('mongoose');

const cogsSchema = new Schema({ 
    AmazonCategory:{
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    BillCode:{
        type: String,
        required: true,
        trim: true,
        unique:true
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
    },
    SoftwareReload: {
        type: String,
        trim:true
    }
});

const COGS = model('COGS', cogsSchema);

module.exports = COGS;