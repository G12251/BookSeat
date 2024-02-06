const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Cinema = require("../models//cinemaModel");
const Show = require("../models/showModel");

// add cinema
router.post("/add-cinema", authMiddleware, async (req, res) => {
  try {
    const newCinema = new Cinema(req.body);
    await newCinema.save();
    res.send({
      success: true,
      message: "Cinema added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get all cinemas
router.get("/get-all-cinemas", authMiddleware, async (req, res) => {
  try {
    const cinemas = await Cinema.find()
      .populate("owner")
      .sort({ createdAt: -1 });
    res.send({
      success: true,
      message: "Cinemas fetched successfully",
      data: cinemas,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get all cinemas by owner
router.post("/get-all-cinemas-by-owner", authMiddleware, async (req, res) => {
  try {
    const cinemas = await Cinema.find({ owner: req.body.owner }).sort({
      createdAt: -1,
    });
    res.send({
      success: true,
      message: "Cinemas fetched successfully",
      data: cinemas,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// update cinema
router.post("/update-cinema", authMiddleware, async (req, res) => {
  try {
    await Cinema.findByIdAndUpdate(req.body.cinemaId, req.body);
    res.send({
      success: true,
      message: "Cinema updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// delete cinema
router.post("/delete-cinema", authMiddleware, async (req, res) => {
  try {
    await Cinema.findByIdAndDelete(req.body.cinemaId);
    res.send({
      success: true,
      message: "Cinema deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// add show
router.post("/add-show", authMiddleware, async (req, res) => {
  try {
    const newShow = new Show(req.body);
    await newShow.save();
    res.send({
      success: true,
      message: "Show added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get all shows by cinema
router.post("/get-all-shows-by-cinema", authMiddleware, async (req, res) => {
  try {
    const shows = await Show.find({ cinema: req.body.cinemaId })
      .populate("movie")
      .sort({
        createdAt: -1,
      });

    res.send({
      success: true,
      message: "Shows fetched successfully",
      data: shows,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// delete show
router.post("/delete-show", authMiddleware, async (req, res) => {
  try {
    await Show.findByIdAndDelete(req.body.showId);
    res.send({
      success: true,
      message: "Show deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get all unique cinemas which have shows of a movie
router.post("/get-all-cinemas-by-movie", authMiddleware, async (req, res) => {
  try {
    const { movie, date } = req.body;

    // find all shows of a movie
    const shows = await Show.find({ movie, date })
      .populate("cinema")
      .sort({ createdAt: -1 });

    // get all unique cinemas
    let uniqueCinemas = [];
    shows.forEach((show) => {
      const cinema = uniqueCinemas.find(
        (cinema) => cinema._id == show.cinema._id
      );

      if (!cinema) {
        const showsForThisCinema = shows.filter(
          (showObj) => showObj.cinema._id == show.cinema._id
        );
        uniqueCinemas.push({
          ...show.cinema._doc,
          shows: showsForThisCinema,
        });
      }
    });

    res.send({
      success: true,
      message: "Cinemas fetched successfully",
      data: uniqueCinemas,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get show by id
router.post("/get-show-by-id", authMiddleware, async (req, res) => {
  try {
    const show = await Show.findById(req.body.showId)
      .populate("movie")
      .populate("cinema");
    res.send({
      success: true,
      message: "Show fetched successfully",
      data: show,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
