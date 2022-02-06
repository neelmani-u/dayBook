const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require('express-validator');

const JWT_SECRET = "dayBook@by-neelmani"

// ROUTE 1: Create a user using: POST "/api/auth/createuser". No login required
router.post("/createuser", [
    body('name', 'Enter a valid name!').isLength({ min: 3 }),
    body('email', 'Enter a valid email!').isEmail(),
    body('password').custom(value => !/\s/.test(value)).withMessage('No spaces are allowed in the password!'),
    body('password', 'Passwors must be at least 6 characters!').isLength({ min: 6 }),
    body('password', 'Password must contain alphanumeric and special characters!').isStrongPassword(),
], async (req, res) => {
    let success = false;

    // If there are error return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false;
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        // Check whether user with this email exist already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            success = false;
            return res.status(400).json({ success, error: "Sorry! User with this email already exist" });
        }

        const salt = bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        const data = {
            id: user.id
        };

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });

    } catch (error) {
        console.error(error.message);
        success = false;
        res.status(500).json({ success, error: "Internal Server Error!" });
    }
})

// ROUTE 2: Logging user using: POST "/api/auth/login".
router.post("/login", [
    body('email', 'Enter a valid email!').isEmail(),
    body('password', 'Password cannot be blank!').exists(),
], async (req, res) => {
    let success = false;
    // If there are error return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false;
        return res.status(400).json({ success, errors: errors.array() });
    }

    // console.log(req.body);

    const { email, password } = req.body;

    try {
        // Check whether user with this email exist or not
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials!" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials!" });
        }

        const data = {
            id: user.id
        };

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });

    } catch (error) {
        console.error(error.message);
        success = false;
        res.status(500).json({ success, error: "Internal Server Error!" });
    }
})


// ROUTE 3: Updating user using: POST "/api/auth/updateuser".
router.post("/updateuser/:id", fetchuser, [
    body('name', 'Enter a valid name!').isLength({ min: 3 }),
    body('password')
        .custom(value => !/\s/.test(value))
        .withMessage('No spaces are allowed in the password!')
        .isLength({ min: 6 })
        .withMessage('Passwors must be at least 6 characters!')
        .isStrongPassword()
        .withMessage('Password must contain alphanumeric and special characters!'),
    body('newPassword')
        .optional()
        .custom(value => !/\s/.test(value))
        .withMessage('No spaces are allowed in the password!')
        .isLength({ min: 6 })
        .withMessage('Passwors must be at least 6 characters!')
        .isStrongPassword()
        .withMessage('Password must contain alphanumeric and special characters!'),
], async (req, res) => {
    let success = false;
    try {
        // If there are error return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            success = false;
            return res.status(400).json({ success, errors: errors.array() });
        }

        const { name, password, newPassword } = req.body;

        // find the user to be updated and update it
        let user = await User.findById(req.params.id);
        if (!user) { return res.status(404).json({ success, error: "Not Found" }) }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Please enter the correct credentials!" });
        }

        if (user.id.toString() !== req.user.id) {
            return res.status(401).json({ success, error: "Not Allowed" });
        }

        // Create a newUser object
        const newUser = {};
        if (name) { newUser.name = name };

        if (newPassword) {
            const salt = bcrypt.genSaltSync(10);
            const secPass = await bcrypt.hash(newPassword, salt);
            newUser.password = secPass;
        }

        user = await User.findByIdAndUpdate(req.params.id, { $set: newUser }, { new: true });
        success = true;
        res.json({ success, user });

    } catch (error) {
        console.error(error.message);
        success = false;
        res.status(500).json({ success, error: "Internal Server Error!" });
    }
})


// ROUTE 4: Get logged in user details using: POST "/api/auth/getuser". Login required
router.post("/getuser", fetchuser, async (req, res) => {
    let success = false;
    try {
        // console.log(req);
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        success = true;
        res.json({ success, user });
    } catch (error) {
        console.error(error.message);
        success = false;
        res.status(500).json({ success, error: "Internal Server Error!" });
    }
})

module.exports = router;
