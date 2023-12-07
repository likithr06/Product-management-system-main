const mongoose = require('mongoose')

const URI='mongodb://localhost:27017/productmanagementsystem'

const connectDb = async () => {
    try{
        await mongoose.connect(URI);
        console.log("Successfully connectod to database")
    }
    catch(error){
        console.log("database connection failed")
    }
};

module.exports = connectDb;