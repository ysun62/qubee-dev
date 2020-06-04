const express = require("express");
const startupDebug = require("debug")("app:startup"); // In terminal: export DEBUG=app:startup
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const filesRoute = require("./routes/files");
const foldersRoute = require("./routes/folders");
const searchesRoute = require("./routes/searches");

const app = express();

const port = process.env.PORT || 5000;
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

if (app.get("env") === "development") {
  require("dotenv").config();
}

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to MongoDB...", err));

app.use(helmet());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// configuring the upload file routes
app.use(express.static(__dirname + "/public"));
app.use("/api/files", filesRoute);
app.use("/api/folders", foldersRoute);
app.use("/api/searches", searchesRoute);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebug("Moregan enabled...");
}

app.use((req, res, next) => {
  setImmediate(() => {
    next(new Error("Something went wrong"));
  });
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
