const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tenantSchema = new Schema({
    tname: {
        type: String,
        required: true
    },
    temail: {
        type: String,
        required: true,
        unique: true,
    },
    tphone: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 11,
    },
    tpropertyat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        default: null,
    },
    tprofilepic: {
        type: String,
        required: true
    },
    tpreferences: {
        Smoke: {
            type: Boolean,
            required: true
        },
        Drinks: {
            type: Boolean,
            required: true
        },
        Pets: {
            type: Boolean,
            required: true
        },
        Vegetarian: {
            type: Boolean,
            required: true
        },
    },
    profile: {
        type: String,
        enum: ['student', 'working', 'traveller'],
        required: true,
    },

})
const renterSchema = new Schema({
    rname: {
        type: String,
        required: true
    },
    remail: {
        type: String,
        required: true,
        unique: true,
    },
    rphone: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 11,
    },
    rguests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant',
        default: [],
    }],
    rproperty:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        // required: true,
        default: [],
    }],
    rprofilepic: {
        type: String,
        required: true
    },
})
const Tenant = mongoose.model('Tenant', tenantSchema);
const Renter = mongoose.model('Renter', renterSchema);
module.exports = { Tenant, Renter };