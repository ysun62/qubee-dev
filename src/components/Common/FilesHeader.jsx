import React from "react";
import CreateFolder from "../Modals/CreateFolder";
import { Row, CardHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faThList } from "@fortawesome/free-solid-svg-icons";
import { Button } from "reactstrap";

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
          <div className="col d-flex align-items-center justify-content-end">
            <Button color="secondary" type="button" className="mr-2 px-3">
              <FontAwesomeIcon icon={faThList} size="lg" />
            </Button>
            <Button color="secondary" type="button" className="mr-2 px-3">
              <FontAwesomeIcon icon={faTh} size="lg" />
            </Button>
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
