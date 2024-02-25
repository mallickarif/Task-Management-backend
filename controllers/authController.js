const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config");


exports.signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, hashedPassword });
        res.status(201).json({ "User created successfully": user });
    } catch (error) {
        res.status(500).json({ errormessage })
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Authentication failed" });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if ( !isValidPassword) {
            return res.status(401).json({ message: "Authentication failed"});
        }
        const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: "1h" });
        res.status(200).json({ message: "Authentication successful", token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};