import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
  textComment: { type: String },
  rating: { type: Number, min: 0, max: 5 },
  author : { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  campground : { type: mongoose.Schema.Types.ObjectId, ref: "Campground"},
  time : { type : Date, default: Date.now }

});
const ReviewModel = mongoose.model("Review", reviewSchema);
export default ReviewModel;
