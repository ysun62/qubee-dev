import React from "react";
import classnames from "classnames";
import ShareFiles from "components/Modals/ShareFiles";
import DeleteFiles from "components/Modals/DeleteFiles";
import MoveFiles from "../Modals/MoveFiles";
import { Container, NavItem, NavLink, Nav, Button, Row, Col } from "reactstrap";

function FileEditActions({
  handleDelete,
  handleMove,
  handleFolderSelection,
  collection,
}) {
  return (
    <Nav className="justify-content-end navbar" role="tablist">
      <NavItem>
        <ShareFiles
          buttonLabel="Share"
          buttonIcon="share-alt"
          modalClassName="modal-dialog-centered"
          collection={collection}
        />
      </NavItem>
      {/* <NavItem>
        <Button color="link">
          <span className="btn-inner--icon mr-md-1 mr-0">
            <i className="fas fa-file-download" />
          </span>
          <span className="btn-inner--text d-md-inline d-none">Download</span>
        </Button>
      </NavItem>
      <NavItem>
        <Button color="link">
          <span className="btn-inner--icon mr-md-1 mr-0">
            <i className="fas fa-edit" />
          </span>
          <span className="btn-inner--text d-md-inline d-none">Rename</span>
        </Button>
      </NavItem> */}
      <NavItem>
        <MoveFiles
          buttonLabel="Move"
          buttonIcon="file-export"
          modalClassName="modal-dialog"
          handleMove={handleMove}
          handleFolderSelection={handleFolderSelection}
          collection={collection}
        />
      </NavItem>
      <NavItem>
        <DeleteFiles
          buttonLabel="Delete"
          buttonIcon="trash-alt"
          modalClassName="modal-dialog"
          handleDelete={handleDelete}
          collection={collection}
        />
      </NavItem>
      <NavItem>
        <Button color="secondary">
          <span className="btn-inner--icon mr-md-1 mr-0">
            <i className="fas fa-times" />
          </span>
          <span className="btn-inner--text d-md-inline d-none">Cancel</span>
        </Button>
      </NavItem>
    </Nav>
  );
}

export default FileEditActions;
