import express from "express";
import User from "../models/userModel.js";
import { getToken } from "../util.js";

const router = express.Router();
router.post("/signin", async (req, res) => {
  let user = await User.findOne({
    email: req.body.email,
  });
  let isMatch = await user.comparePassword(req.body.password);
  if (isMatch) {
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: getToken(user),
    });
  } else {
    res.status(401).send({ message: "invalid Email or Password" });
  }
});
router.post("/rigester", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const newUser = await user.save();
    if (newUser) {
      res.send({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: getToken(newUser),
      });
    } else {
      res.status(401).send({ msg: "invalid user data" });
    }
  } catch (error) {
    res.status(401).send({ msg: "invalid user data (email-name)" });
  }
});
export default router;
