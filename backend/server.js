const config = require("config");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const debug = require("debug")("app:debug"); // In terminal: export DEBUG=app:debug OR DEBUG=app:debug node/nodemon index.js
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
const db_dev = config.get("db_dev");
const port = process.env.PORT || config.get("port");
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

mongoose
  .connect(db_dev, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => debug(`Connected to MongoDB -> ${db_dev}`))
  .catch((ex) => debug("Could not connect to MongoDB...", ex.response));

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
app.use(express.static("public"));
app.use("/api/files", filesRoute);
app.use("/api/folders", foldersRoute);
app.use("/api/searches", searchesRoute);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Moregan enabled...");
}

app.use((req, res, next) => {
  setImmediate(() => {
    next(new Error("Something went wrong"));
  });
});

app.use(function (err, req, res, next) {
  debug(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

app.listen(port, () => debug(`Listening on port ${port}`));
