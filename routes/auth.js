const router = require("express").Router();
const User = require("../models/User");

//REGISTER
router.post("/register", async(req, res) => {
    const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
    try {
        const user = await newUser.save();
        const token = await newUser.generateAuthToken();
        res.status(201).json({ user, token });
    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
});

//Login
router.post("/login", async(req, res) => {
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );
        const { password, ...info } = user._doc;
        const token = await user.generateAuthToken();
        res.status(200).json({ info, token });
    } catch (e) {
        res.status(400).send({ erorr: "Unable to login" });
    }
});

module.exports = router;