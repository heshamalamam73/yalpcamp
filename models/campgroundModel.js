import mongoose from "mongoose";
const Schema = mongoose.Schema;

const campgroundSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  images: [
    {
      url : String , 
      file_name : String
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
