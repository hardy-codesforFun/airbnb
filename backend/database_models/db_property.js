const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const propertySchema=new Schema({
    pname:{
        type:String,
        required:true,
        unique:true
    },
    plocation:{
        type:String,
        required:true
    },
    powner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'renter',
        required:true
    },
    pprice:{
        type:Number,
        required:true
    },
    pcoverimage:{
        type:String,
        required:true
    },
    pdescription:{
        type:String,
        required:true
    },
    ptype:{
        type:String,
        required:true
    },
    pbookedDates:[{
        type:Date,
        default:[]
    }],
    pavailable:{
        type:Boolean,
        default:true
    }
})
const Property=mongoose.model('Property',propertySchema);
module.exports={Property};