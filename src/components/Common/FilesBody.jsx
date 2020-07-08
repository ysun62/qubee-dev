import React, { useState, useEffect } from "react";
import GalleryView from "./GalleryView";
import ListView from "./ListView";

function FilesBody({
  view,
  collection,
  getFiles,
  isSelected,
  onCheckboxClick,
  onSelectAll,
  setFolderId,
  setFileCount,
  handleSortFiles,
  ...props
}) {
  const [allFiles, setAllFiles] = useState([]);

  useEffect(() => {
    const folderId = props.match.params.id
      ? props.match.params.id
      : collection.rootFolder._id;

    setAllFiles(
      collection.dataCache.filter((file) => file.parentDirectoryId === folderId)
    );

    setFileCount(allFiles.length);
    setFolderId(folderId);
  }, [
    allFiles.length,
    collection.dataCache,
    collection.rootFolder._id,
    props.match.params.id,
    setFileCount,
    setFolderId,
  ]);

  return (
    <>
      {view === "list" ? (
        <ListView
          allFiles={allFiles}
          getFiles={getFiles}
          isSelected={isSelected}
          onCheckboxClick={onCheckboxClick}
          onSelectAll={onSelectAll}
        />
      ) : (
        <GalleryView
          allFiles={allFiles}
          getFiles={getFiles}
          isSelected={isSelected}
          onCheckboxClick={onCheckboxClick}
          onSelectAll={onSelectAll}
        />
      )}
    </>
  );
}

export default FilesBody;
