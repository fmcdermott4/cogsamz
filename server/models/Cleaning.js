const {Schema, model} = require('mongoose');

const cleaningSchema = new Schema({ 
    LPN:{
        type: Schema.Types.ObjectId,
        ref: "AMM2"
    },
    Pass:{
        type: Boolean,
        default: false
    },
    Cleaning:[
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

const Cleaning = model('Cleaning', cleaningSchema);

module.exports = Cleaning;