const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        mongoose.connect("mongodb://localhost:27017/contactBackendAPI");
        console.log("database connected");
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;