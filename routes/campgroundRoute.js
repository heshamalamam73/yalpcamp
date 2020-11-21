import { createRequire } from 'module';
const require = createRequire(import.meta.url);
if( process.env.NODE_ENV !== "production"){
  require('dotenv').config();
}
import express from "express";
import Campground from "../models/campgroundModel.js";
import Review from "../models/ReviewModel.js";
import catchAsync from "../helpers/catchAsync.js";
import { isAuth } from "../util.js";
import path from "path";
var multer = require('multer')
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN
const geocoder  = mbxGeocoding({accessToken : mapBoxToken})



const router = express.Router();


// router.post ('/', upload.array('file'), async (req, res ,next )=> {
//   console.log(req.body , req.files)
//   let images = await req.files.map(f => ({url : f.path , filename : f.filename }))  
//   // const campground = new Campground(req.body.campground);
//   // await campground.save();
//   res.status(200).send(images);
// });

router.get("/", async (req, res) => {
  const campgrounds = await Campground.find({}).populate("author");
  res.send(campgrounds);
});

router.post(
  "/",
  catchAsync(async (req, res, next) => {
   const geoData =await   geocoder.forwardGeocode({
     query :req.body.location,
     limit: 1
    }).send()
    const campground = new Campground({
      title: req.body.title,
      location: req.body.location,
      price: req.body.price,
      images: req.body.images,
      description: req.body.description,
      author: req.body.author,
    });
    campground.geometry = geoData.body.features[0].geometry
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
    const campground = await Campground.findById(req.params.id)
      .populate("reviews")
      .populate("author");
    res.send(campground);
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
      campground.images = req.body.images;
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
      author: req.body.author,
      campground: req.params.id,
    });
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.status(200).send(review);
  })
);
router.get(
  "/:id/reviews",
  catchAsync(async (req, res) => {
    const reviews = await Review.find({ campground: req.params.id }).populate(
      "author"
    );
    res.status(200).send(reviews);
  })
);

// router.all("*", (req, res) => {

// })
export default router;
