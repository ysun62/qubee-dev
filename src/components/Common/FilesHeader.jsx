import React from "react";
import CreateFolder from "../Modals/CreateFolder";
import { Row, CardHeader } from "reactstrap";

import { Button } from "reactstrap";

function FilesHeader({
  createFolderButton,
  getFiles,
  getFileCount,
  getFolderId,
  listIcon,
  galleryIcon,
  toggleView,
}) {
  return (
    <CardHeader className="border-0">
      <Row className="align-items-center">
        <div className="col">
          <h3 className="my-2">All {getFileCount}</h3>
        </div>
        {createFolderButton && (
          <div className="col d-flex align-items-center justify-content-end">
            <Button
              color="secondary"
              type="button"
              className="mr-2 px-3"
              onClick={() => toggleView("list")}
            >
              {listIcon}
            </Button>
            <Button
              color="secondary"
              type="button"
              className="mr-2 px-3"
              onClick={() => toggleView("gallery")}
            >
              {galleryIcon}
            </Button>
            <CreateFolder
              buttonLabel="Create new folder"
              modalClassName="modal-dialog"
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
