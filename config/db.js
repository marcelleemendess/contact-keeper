const mongoose = require('mongoose');
const config = require('config'); // accesses to the global variable 
const db = config.get('mongoURI');

const connectDB = async () => {  //mongodb returns promises 
    try {
        await mongoose
        .connect(db, { // to avoid warnings
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        }); 
        console.log('MongoDB Connected...'); 
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;