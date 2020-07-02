const config = require("config");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const { join } = require("path");
const debug = require("debug")("app:debug");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const zip = require('express-easy-zip');

const createUploadsDirs = require("./utils/createUploadsDirs");
const filesRoute = require("./routes/files");
const foldersRoute = require("./routes/folders");
const searchesRoute = require("./routes/searches");
const settingsRoute = require("./routes/settings");

const app = express();
const mongo_dev = config.get("db_dev");
const port = process.env.PORT || config.get("port");
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

mongoose.connect(mongo_dev, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async function () {
  debug("Connected to MonogoDB ->", mongo_dev);

  /**
   * Instantiate MongoDB Database
   */
  const { Folder } = require("./models/folder");
  const { Setting } = require("./models/setting");
  const isInit = await Setting.find().select("appInit");
  const foldersExists = await createUploadsDirs(
    join(__dirname, "../public", "uploads"),
    join(__dirname, "../public", "shared")
  );
  const rootDir = await Folder.findOne({ name: "All" });
  const initialFolders = ["Documents", "Pictures", "Videos"];

  // debug("App root folder -> " + rootDir.name + "/" + rootDir._id);

  // Check if app has instatiated and database is seeded
  if (!isInit.length || !isInit[0].appInit) {
    // Check if root directories exist
    if (!foldersExists)
      return debug("There was an error creating the directories.");

    // Create initial folder documents in MongoDB
    initialFolders.map(async (folder) => {
      await new Folder({
        name: folder,
        slug: folder.replace(/\s+/g, "-").toLowerCase(),
        parentMap: {
          FOLDER: rootDir._id,
        },
        parentDirectoryId: rootDir._id,
      }).save();
    });

    // Create settings document in MonogDB and set
    // appInit property to true after instatiation
    try {
      if (isInit[0]) {
        await Setting.findOneAndUpdate(
          { _id: isInit[0]._id },
          {
            $set: {
              appInit: true,
            },
          },
          { new: true }
        );
      } else {
        await new Setting({
          appInit: true,
        }).save();
      }
    } catch (ex) {
      debug(ex);
    }
    debug("MongoDB is seeded");
  } else {
    debug("MongoDB is already seeded!");
  }
});

app.use(helmet());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(zip());

// configuring the upload file routes
app.use(express.static("public"));
app.use("/api/files", filesRoute);
app.use("/api/folders", foldersRoute);
app.use("/api/searches", searchesRoute);
app.use("/api/settings", settingsRoute);

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
