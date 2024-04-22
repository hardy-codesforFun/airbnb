const mongoose = require('mongoose');

const mongourl = 'mongodb://localhost:27017/w-airbnb';
const connectToDB = async () => {
    try {
        await mongoose.connect(mongourl);
        console.log('Connected to DB');
    }
    catch (err) {
        console.log('Error in connecting to DB');
    }
}
module.exports = connectToDB;