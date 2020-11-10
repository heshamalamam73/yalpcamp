import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
  textComment: { type: String },
  rating: { type: Number, min: 0, max: 5 },
});
const ReviewModel = mongoose.model("Review", reviewSchema);
export default ReviewModel;
