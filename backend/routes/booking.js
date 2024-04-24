const express = require('express');
const router = express.Router();
const { Tenant,Renter} = require('../database_models/db_user');
const { Property } = require('../database_models/db_property');
router.post('/finishBooking', async (req, res) => {
    const tenant_id=req.headers.tenant_id;
    if(!tenant_id){
        return res.status(400).json({msg:'Tenant not logged in'})
    }
    const tenant=await Tenant.findById(tenant_id);
    if(!tenant){
        return res.status(400).json({msg:'Tenant not found'})
    }
    const property_id=req.body.property_id;
    if(!property_id){
        return res.status(400).json({msg:'Property id not provided'})
    }
    const property=await Property.findById(property_id);
    if(!property){
        return res.status(400).json({msg:'Property not found'})
    }
    const bookingDates=req.body.bookingDates;
    if(!bookingDates){
        return res.status(400).json({msg:'Booking dates not provided'})
    }
    const renterid=property.powner;
    const renter=await Renter.findById(renterid);
    renter.rguests.push(tenant_id);
    property.pbookedDates.push(...bookingDates);
    property.pavailable=false;
    await renter.save();
    await property.save();
    res.status(200).json({msg:'Booking successful'})
})
//Todo 
//Add a route to get all bookings of a tenant
//Add a route to get all bookings of a renter
//Add a route to get all bookings of a property
//Route to cancel booking
//route to add the booking in bookings database

module.exports = router;
