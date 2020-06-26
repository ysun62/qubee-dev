import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";

function UploadFolderPicker({ collection, selectedData, selectedFolderId }) {
  const [folderId, setFolderId] = useState(
    collection.dataCache.find((d) => d.slug === "all")._id
  );
  const [folderModels, setFolderModels] = useState([]);

  const handleOnCLick = (id) => {
    selectedFolderId(id);
    setFolderId(id);
  };

  useEffect(() => {
    setFolderModels(
      collection.models.filter(
        (m) => m.kind === "FOLDER" && m.parentDirectoryId === folderId
      )
    );
  }, [collection.dataCache, collection.models, folderId]);

  return (
    <>
      <ul className="breadcrumb folder-path list-unstyled">
        <li className="list-inline-item">
          <Button
            onClick={() =>
              handleOnCLick(
                collection.dataCache.find((d) => d.slug === "all")._id
              )
            }
            color="link"
            size="sm"
            type="button"
          >
            All
          </Button>
        </li>
      </ul>
      <div className="page">
        <ListGroup flush>
          {folderModels.map((folder) => (
            <ListGroupItem
              key={folder._id}
              tag="button"
              action
              onClick={() => handleOnCLick(folder._id)}
            >
              <i className="fas fa-folder-open mr-2" />
              <span className="mb-0 text-sm">{folder.name}</span>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    </>
  );
}

export default UploadFolderPicker;
