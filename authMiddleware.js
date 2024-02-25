const jwt = require("jsonwebtoken");
const config = require("./config");

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if ( !token) {
        res.status(403).json({ message: "No token provided" });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Failed to authenticate token "});
        }
        req.userId = decoded.userId;
        next();
    });
};