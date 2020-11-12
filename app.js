import express from "express";
import mongoose from "mongoose";
import config from "./config.js";
import dotenv from "dotenv";
const mongodbUrl = config.MONGODB_URL;
import userRoute from "./routes/userRoute.js";
import bodyParser from "body-parser";
import campgroundRoute from "./routes/campgroundRoute.js";
import { seedDb } from "./seeds/index.js";
import path from "path";
const __dirname = path.resolve();

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch((error) => console.log(error));
app.use("/api/users", userRoute);
app.use("/campgrounds", campgroundRoute);
// app.all("*", (req, res, next) => {
//   res.send("Page Not Found ");
// });
if (process.env.NODE_ENV) {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "samthing went wrong" } = err;
  res.status(statusCode).send(message);
});

// seedDb();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("started on port 3000");
});
