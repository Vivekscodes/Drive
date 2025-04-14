const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userSchema = require("../models/user")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register",
    body('username').isLength({ min: 3 }).withMessage("Username must be at least 3 characters long"),
    body('email').trim().isEmail().isLength({ min: 13 }).withMessage("Please enter a valid email"),
    body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), message: "Invalid data" });
        }

        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userSchema.create({
            username: username,
            email: email,
            password: hashedPassword
        }).then(() => {
            console.log(req.body);
        })
        res.send("user registerd");
    });


router.get("/login", (req, res) => {
    res.render("login");
});
router.post("/login",

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), message: "Invalid data" });
        }
        console.log(req.body)
        const { username, password } = req.body;
        const user = await userSchema.findOne({ username: username });
        if (!user) {
            return res.status(400).json({ message: "Either username or Password is not correct" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Either username or Password is not correct" });
        }
        const token = jwt.sign({
            userId: user._id,
            email: user.email,
            username: user.username
        }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie("token", token);
        res.send("Login successful");

    }



)

module.exports = router;