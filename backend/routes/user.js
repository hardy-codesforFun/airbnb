const express = require('express');
const router = express.Router();
const { Tenant,Renter} = require('../database_models/db_user');
const { Property } = require('../database_models/db_property');

const { check, validationResult } = require('express-validator');
router.post('/signupTenant', [
    check('tname').not().isEmpty().trim().escape().isLength({ min: 3 }).isString(),
    check('temail').isEmail().normalizeEmail(),
    check('tphone').isMobilePhone('any').trim().escape(),
    check('tpreferences').isObject(),
    check('profile').isString().isIn(['student', 'working', 'traveller']),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const existinguser = await Tenant.findone({ temail: req.body.temail });
    try {
        const tenant = new Tenant({
            tname: req.body.tname,
            temail: req.body.temail,
            tphone: req.body.tphone,
            tprofilepic: req.body.tprofilepic, // Handle tprofilepic here
            tpreferences: req.body.tpreferences,
            profile: req.body.profile,
        });

        await tenant.save();
        res.json({ msg: 'Tenant signed up successfully' });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.post('/signupRenter', [
    check('rname').isString(),
    check('remail').isEmail().normalizeEmail(),
    check('rphone').isMobilePhone('any').trim().escape(),

], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(res.body)
    const existinguser = await Renter.findOne({ remail: req.body.remail });
    if(existinguser) {
        return res.status(400).json({ msg: 'User already exists' });
    };              
    try {
        const renter = new Renter({                 
            rname: req.body.rname,
            remail: req.body.remail,
            rphone: req.body.rphone,
            rprofilepic: req.body.rprofilepic,
        });
        await renter.save();
        res.json({ msg: 'Renter signed up successfully' });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/addProperty',async(req,res)=>{
    // console.log(req.headers);
    const renterId=req.headers.renterid;
    console.log(renterId)
    const renter = await Renter.findOne({_id: renterId });
    if (!renter) {
        return res.status(400).json({ msg: 'Renter not found' });
    }
    const existing_property=await Property.findOne({pname:req.body.pname});
    if(existing_property && existing_property.powner===renterId){
        return res.status(400).json({msg:'Property already exists'})
    }
    else if(existing_property && existing_property.powner!==renterId){
        return res.status(400).json({msg:'Property already exists with another owner'})
    }
    try {
        const property = new Property({
            pname: req.body.pname,
            plocation: req.body.plocation,
            powner: renterId,
            pprice: req.body.pprice,
            pcoverimage: req.body.pcoverimage,
            pdescription: req.body.pdescription,
            ptype: req.body.ptype,
        });
        await property.save();
        renter.rproperty.push(property._id);
        await renter.save();
        res.json({ msg: 'Property added successfully' });

    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})
router.get('/getProperties',async(req,res)=>{
    const properties=await Property.find({powner:req.headers.renterid});
    res.json(properties);
})


module.exports = router
