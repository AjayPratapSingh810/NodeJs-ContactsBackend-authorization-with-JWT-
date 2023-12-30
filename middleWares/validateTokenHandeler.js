const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, "ajay thakur", (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("user is not authorized");
            }
            console.log(decoded);
            req.User = decoded.User;
            next();
        });
        if (!token) {
            res.status(401);
            throw new Error("user is not authorized");
        }
    }
});

module.exports = validateToken;