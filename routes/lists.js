const router = require("express").Router();
const List = require("../models/List");
const verify = require("../auth/verifyToken");

//CREATE
router.post("/", verify, async(req, res) => {
    if (req.user.isAdmin) {
        const newList = new List(req.body);
        try {
            const saveList = await newList.save();
            res.status(201).json(saveList);
        } catch (e) {
            res.status(500).json(e);
        }
    } else {
        res.status(403).json("Not authorized !");
    }
});
//DELETE
router.delete("/:id", verify, async(req, res) => {
    if (req.user.isAdmin) {
        try {
            await List.findByIdAndDelete(req.params.id);
            res.status(200).json("The List has been deleted...");
        } catch (e) {
            res.status(500).json(e);
        }
    } else {
        res.status(403).json("Not authorized !");
    }
});
//GET ALL
router.get("/", verify, async(req, res) => {
    const typeQuery = req.query.type;
    const generQuery = req.query.gener;
    let list = [];
    try {
        if (typeQuery) {
            if (generQuery) {
                list = await List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery, genre: generQuery } },
                ]);
            } else {
                list = await list.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery } },
                ]);
            }
        } else {
            list = await List.aggregate([{ $sample: { size: 10 } }]);
        }
        res.status(200).json(list);
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;