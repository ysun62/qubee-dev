import React from "react";
import CreateFolder from "../Modals/CreateFolder";
import { Row, CardHeader } from "reactstrap";

function FilesHeader({
  collection,
  createFolderButton,
  getFiles,
  getFileCount,
  getFolderId,
}) {
  return (
    <CardHeader className="border-0">
      <Row className="align-items-center">
        <div className="col">
          <h3 className="my-2">All {getFileCount}</h3>
        </div>
        {createFolderButton && (
          <div className="col text-right">
            <CreateFolder
              buttonLabel="Create new folder"
              modalClassName="modal-dialog"
              collection={collection}
              getFiles={getFiles}
              getFolderId={getFolderId}
            />
          </div>
        )}
      </Row>
    </CardHeader>
  );
}

export default FilesHeader;
