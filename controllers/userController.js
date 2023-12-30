const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const user = require("../models/usersModel");
const jwt = require("jsonwebtoken");



const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("all fields are mandatory");
    }

    const userAvailable = await user.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User aleady exist");
    }
    const hashPassword = await bcrypt.hash(password, 10);//"salt rounds" in Bcrypt, it refers to the number of times the key-stretching algorithm is applied.
    console.log(hashPassword);
    const User = await user.create({
        name,
        email,
        password: hashPassword
    });
    console.log(User);
    if (User) {
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error("user data was not valid");
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("all fields are mandatory");
    }
    const User = await user.findOne({ email });
    //comapre password with hashPassword
    if (User && (await bcrypt.compare(password, User.password))) {
        const accessToken = jwt.sign({
            User: {
                name: User.name,
                email: User.email,
                id: User.id,
            },
        },
            "ajay thakur",
            { expiresIn: "15m" }
        );
        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("email password is not valid");
    }
});

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.User);
})

module.exports = { registerUser, loginUser, currentUser };