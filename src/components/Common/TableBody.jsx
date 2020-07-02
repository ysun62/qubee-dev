import React, { useState, useEffect } from "react";
import { Media, Button, Badge } from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MetaTags from "../Modals/MetaTags";
import fileSizeConversion from "../../utils/fileSizeConversion";
import { sortFiles } from '../../utils/sortFiles';

function TableBody({
  collection,
  getFiles,
  isSelected,
  onCheckboxClick,
  setFolderId,
  setFileCount,
  ...props
}) {
  const [allFiles, setAllFiles] = useState([]);

  useEffect(() => {
    const folderId = props.match.params.id
      ? props.match.params.id
      : collection.rootFolder._id;

    let _allFiles = collection.dataCache.filter((file) => file.parentDirectoryId === folderId);
    if (collection.sorting) {
      sortFiles(_allFiles, collection.sorting.attribute, collection.sorting.direction)
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

  let tableBody;

  if (allFiles.length) {
    tableBody = (
      <tbody>
        {allFiles.map((file) => (
          <tr key={file._id} className="file-list-item">
            <th scope="row">
              <Button
                color="link"
                size="sm"
                type="button"
                onClick={() => onCheckboxClick(file)}
              >
                <FontAwesomeIcon
                  icon={
                    isSelected[file._id] ? "check-square" : ["far", "square"]
                  }
                  size="lg"
                />
              </Button>
            </th>
            <td>
              <Media className="align-items-center">
                <Link to={`/admin/folder/${file._id}`}>
                  <FontAwesomeIcon
                    icon={file.kind === "FOLDER" ? "folder-open" : "file-image"}
                    className="mr-2"
                    size="lg"
                  />
                  <span className="mb-0 text-sm">{file.name}</span>
                </Link>
              </Media>
              {file.metaTags && (
                <div className="tags-container mt-2">
                  {file.metaTags.map((tag, i) => (
                    <Badge
                      key={tag + i}
                      className="badge-default mr-2"
                      href="#pablo"
                      pill
                    >
                      {tag}
                    </Badge>
                  ))}
                  <MetaTags
                    buttonLabel="add +"
                    fileId={file._id}
                    getFiles={getFiles}
                  />
                </div>
              )}
            </td>
            <td>{file.createdDate}</td>
            <td>
              {file.kind === "FILE" && fileSizeConversion(file.size, false)}
            </td>
          </tr>
        ))}
      </tbody>
    );
  } else {
    tableBody = (
      <tbody>
        <tr className="file-list-item">
          <td colSpan="4" style={{ textAlign: "center" }}>
            <h3>This folder is empty</h3>
            Upload your files here
          </td>
        </tr>
      </tbody>
    );
  }

  return tableBody;
}

export default TableBody;
