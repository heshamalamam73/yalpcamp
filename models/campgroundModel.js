import mongoose from "mongoose";
const Schema = mongoose.Schema;

const campgroundSchema = new mongoose.Schema({
  title: { type: String, required: false },
  price: { type: Number, required: false },
  description: { type: String, required: false },
  location: { type: String, required: false },
  images: [
    {
      url : String , 
      filename : String
    }
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  time : { type : Date, default: Date.now }

});
const campgroundModel = mongoose.model("Campground", campgroundSchema);
export default campgroundModel;
