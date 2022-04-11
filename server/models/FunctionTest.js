const {Schema, model} = require('mongoose');

const functionTestSchema = new Schema({ 
    LPN:{
        type: Schema.Types.ObjectId,
        ref: "AMM2"
    },
    Pass:{
        type: Boolean,
        default: false
    },
    Test:[
            {
                User:{
                    type: Schema.Types.ObjectId,
                    ref: "User"
                },
                StartTime:{
                    type: Date
                },
                EndTime:{
                    type: Date
                }
            }
    ]




    
});

const FunctionTest = model('FunctionTest', functionTestSchema);

module.exports = FunctionTest;