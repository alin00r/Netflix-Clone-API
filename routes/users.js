const router = require("express").Router();
const User = require("../models/User");
const verify = require("../auth/verifyToken");

//UPDATE
router.patch("/:id", verify, async(req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id, {
                    $set: req.body,
                }, { new: true }
            );
            res.status(200).json(updatedUser);
        } catch (e) {
            res.status(500).send(e);
        }
    } else {
        res.status(403).json("You can only update your account");
    }
});
//DELETE
router.delete("/:id", verify, async(req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been Deleted");
        } catch (e) {
            res.status(500).send(e);
        }
    } else {
        res.status(403).json("You can only Delete your account");
    }
});
//GET
router.get("/find/:id", async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (e) {
        res.status(500).send(e);
    }
});
//GET ALL
router.get("/", verify, async(req, res) => {
    const query = req.query.new;
    if (req.user.isAdmin) {
        try {
            const users = query ?
                await User.find().sort({ _id: -1 }).limit(10) :
                await User.find();
            res.status(200).json(users);
        } catch (e) {
            res.status(500).json(e);
        }
    } else {
        res.status(403).json();
    }
});
//GET USER STATS
router.get("/stats", async(req, res) => {
    try {
        const data = await User.aggregate([{
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(data);
    } catch (e) {
        res.status(500).send(e);
    }
});
//LOGOUT
router.post("/logout", verify, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });

        await req.user.save();
        res.json("Logout from this device successfully ");
    } catch (e) {
        res.status(500).send(e);
    }
});
//LOGOUTALL
router.post("/logoutAll", verify, async(req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.json("Logout from All devices successfully");
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});
module.exports = router;