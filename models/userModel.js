import mongoose from "mongoose";
const Schema = mongoose.Schema;
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, dropDups: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  campgrounds: [
    {
      type: Schema.Types.ObjectId,
      ref: "Campground",
    },
  ],
});
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});
const userModel = mongoose.model("User", userSchema);
export default userModel;
