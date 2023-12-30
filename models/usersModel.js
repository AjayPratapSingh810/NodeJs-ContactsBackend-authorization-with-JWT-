const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "please add the contact name"]
    },
    email: {
        type: String,
        required: [true, "please add contact email address"],
        unique: [true, "email is already taken"]
    },
    password: {
        type: String,
        required: [true, "Enter the password"]
    },
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("user", userSchema);