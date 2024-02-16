const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../auth/verifyToken");

//CREATE
router.post("/", verify, async(req, res) => {
    if (req.user.isAdmin) {
        const newMovie = new Movie(req.body);
        try {
            const saveMovie = await newMovie.save();
            res.status(201).json(saveMovie);
        } catch (e) {
            res.status(500).json(e);
        }
    } else {
        res.status(403).json("Not authorized !");
    }
});

//UPDATE
router.patch("/:id", verify, async(req, res) => {
    if (req.user.isAdmin) {
        try {
            const updatedMovie = await Movie.findByIdAndUpdate(
                req.params.id, {
                    $set: req.body,
                }, { new: true }
            );
            res.status(200).json(updatedMovie);
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
            const updatedMovie = await Movie.findByIdAndDelete(req.params.id);
            res.status(200).json("The Movie has been deleted...");
        } catch (e) {
            res.status(500).json(e);
        }
    } else {
        res.status(403).json("Not authorized !");
    }
});
//GET
router.get("/find/:id", verify, async(req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.status(200).json(movie);
    } catch (e) {
        res.status(500).json(e);
    }
});
//GET ALL
router.get("/", verify, async(req, res) => {
    if (req.user.isAdmin) {
        try {
            const movies = await Movie.find();
            res.status(200).json(movies.reverse());
        } catch (e) {
            res.status(500).json(e);
        }
    } else {
        res.status(403).json("Not authorized !");
    }
});
//GET RANDOM
router.get("/random", verify, async(req, res) => {
    const type = req.query.type;
    let movie;
    try {
        if (type === "series") {
            movie = await Movie.aggregate([
                { $match: { isSeries: true } },
                { $sample: { size: 1 } },
            ]);
        } else {
            movie = await Movie.aggregate([
                { $match: { isSeries: false } },
                { $sample: { size: 1 } },
            ]);
        }
        res.status(200).json(movie);
    } catch (e) {
        res.status(500).json(e);
    }
});
module.exports = router;