import React, { useState, useEffect } from "react";
import GalleryView from "./GalleryView";
import ListView from "./ListView";
import { sortFiles } from "../../utils/sortFiles";

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

    let _allFiles = collection.dataCache.filter(
      (file) => file.parentDirectoryId === folderId
    );
    if (collection.sorting) {
      sortFiles(
        _allFiles,
        collection.sorting.attribute,
        collection.sorting.direction
      );
    }
    setAllFiles(_allFiles);

    setFileCount(allFiles.length);
    setFolderId(folderId);
  }, [
    allFiles.length,
    collection.sorting,
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
          {...props}
          allFiles={allFiles}
          getFiles={getFiles}
          isSelected={isSelected}
          onCheckboxClick={onCheckboxClick}
          onSelectAll={onSelectAll}
          handleSortFiles={handleSortFiles}
          collection={collection}
          setFolderId={setFolderId}
          setFileCount={setFileCount}
        />
      ) : (
        <GalleryView
          {...props}
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
