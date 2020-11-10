import mongoose from "mongoose";
const Schema = mongoose.Schema;

const campgroundSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});
const campgroundModel = mongoose.model("Campground", campgroundSchema);
export default campgroundModel;
