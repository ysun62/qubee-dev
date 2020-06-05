import React from "react";
import classnames from "classnames";
import ShareFiles from "components/Modals/ShareFiles";
import DeleteFiles from "components/Modals/DeleteFiles";
import { Container, NavItem, NavLink, Nav, Button, Row, Col } from "reactstrap";

function FileEditActions({ handleDelete }) {
  return (
    <Nav className="justify-content-end navbar" role="tablist">
      <NavItem>
        <ShareFiles
          buttonLabel="Share"
          buttonIcon="share-alt"
          modalClassName="modal-dialog-centered"
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
        <Button color="link">
          <span className="btn-inner--icon mr-md-1 mr-0">
            <i className="fas fa-file-export" />
          </span>
          <span className="btn-inner--text d-md-inline d-none">Move</span>
        </Button>
      </NavItem>
      <NavItem>
        <DeleteFiles
          buttonLabel="Delete"
          buttonIcon="trash-alt"
          modalClassName="modal-dialog"
          handleDelete={handleDelete}
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
