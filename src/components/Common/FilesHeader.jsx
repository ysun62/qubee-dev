import React from "react";
import CreateFolder from "../Modals/CreateFolder";
import { Row, CardHeader } from "reactstrap";

function FilesHeader({ count, createFolderButton, getFiles }) {
  return (
    <CardHeader className="border-0">
      <Row className="align-items-center">
        <div className="col">
          <h3 className="my-2">All {count}</h3>
        </div>
        {createFolderButton && (
          <div className="col text-right">
            <CreateFolder
              buttonLabel="Create new folder"
              modalClassName="modal-dialog"
              getFiles={getFiles}
            />
          </div>
        )}
      </Row>
    </CardHeader>
  );
}

export default FilesHeader;
