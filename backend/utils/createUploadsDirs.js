const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));
const { Folder } = require("../models/folder");

async function createUploadsDirs(uploadsDir, sharedDir) {
  const getRootDirs = await Folder.find({
    name: {
      $in: ["All", "Shared"],
    },
  });

  const rootDirs = [
    {
      name: "All",
      slug: "all",
      isRoot: true,
    },
    {
      name: "Shared",
      slug: "shared",
      isRoot: true,
    },
  ];

  // Check if the "Uploads" folder exists in the current directory.
  await fs
    .accessAsync(uploadsDir)
    .then(async () => {
      // Create the "All" document entry in MongoDB if it doesn't exist.
      if (!getRootDirs.length) await new Folder(rootDirs[0]).save();
    })
    .catch(async (ex) => {
      // Create the "Uploads" folder in the current directory.
      await fs
        .mkdirAsync(uploadsDir)
        .then(async () => {
          // Create the "All" document entry in MongoDB if it doesn't exist.
          if (!getRootDirs.length) await new Folder(rootDirs[0]).save();
        })
        .catch(async (ex) => {
          console.log("Cannot create folder", ex);
          return false;
        });
    });

  // Check if the "Shared" folder exists in the current directory.
  await fs
    .accessAsync(sharedDir)
    .then(async () => {
      // Create the "Shared" document entry in MongoDB if it doesn't exist.
      if (!getRootDirs.length) await new Folder(rootDirs[1]).save();
    })
    .catch(async (ex) => {
      // Create the "Shared" folder in the current directory.
      await fs
        .mkdirAsync(sharedDir)
        .then(async () => {
          // Create the "Shared" document entry in MongoDB if it doesn't exist.
          if (!getRootDirs.length) await new Folder(rootDirs[1]).save();
        })
        .catch((ex) => {
          console.log("Cannot create folder", ex);
          return false;
        });
    });

  return true;
}

module.exports = createUploadsDirs;
