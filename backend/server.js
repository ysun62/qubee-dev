if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const imagesRoute = require("./routes/images");
const foldersRoute = require("./routes/folders");

const app = express();
const port = process.env.PORT || 5000;
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: "16mb",
  })
);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(fileUpload());

// configuring the upload file routes
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", imagesRoute);
app.use("/folders", foldersRoute);

app.use((req, res, next) => {
  // Error goes via `next()` method
  setImmediate(() => {
    next(new Error("Something went wrong"));
  });
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

app.listen(port, () => {
  console.log("Connected to port " + port);
});
