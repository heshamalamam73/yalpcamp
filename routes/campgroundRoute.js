import express from "express";
import Campground from "../models/campgroundModel.js";
import Review from "../models/ReviewModel.js";
import catchAsync from "../helpers/catchAsync.js";
import { isAuth } from "../util.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const campgrounds = await Campground.find({});
  res.send(campgrounds);
});
router.post(
  "/",
  catchAsync(async (req, res, next) => {
    const campground = new Campground({
      title: req.body.title,
      location: req.body.location,
      price: req.body.price,
      image: req.body.image,
      description: req.body.description,
    });
    const newCampground = await campground.save();
    if (newCampground) {
      res.status(200).send(newCampground);
    } else {
      res.status(404).send(error);
    }
  })
);

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const reviews = await campground.populate("reviews");
    res.send({ campground, reviews });
  })
);

router.put(
  "/:id",
  catchAsync(async (req, res) => {
    const campground = await Campground.findOne({ _id: req.params.id });
    if (campground) {
      campground.location = req.body.location;
      campground.description = req.body.description;
      campground.price = req.body.price;
      campground.title = req.body.title;
      campground.image = req.body.image;
      const updatedCampground = await campground.save();
      if (updatedCampground) {
        return res
          .status(201)
          .send({ message: "campground updated! ", data: updatedCampground });
      }
    } else {
      res.status(500).send({ message: "error in UpdateCampground try again" });
    }
  })
);
router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.status(200).send("deleted");
  })
);

//rewiew routes

router.post(
  "/:id/reviews",
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review({
      textComment: req.body.textComment,
      rating: req.body.rating,
    });
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.status(200).send(review);
  })
);

// router.all("*", (req, res) => {

// })
export default router;
