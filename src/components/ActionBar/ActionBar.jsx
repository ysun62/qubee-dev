import React from "react";
import classnames from "classnames";

// reactstrap components
import {
  Card,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Button,
} from "reactstrap";

const ActionBar = (props) => {
  const handleShareFile = () => {
    return null;
  };

  return (
    <div className="action-bar border-bottom fixed-top bg-secondary">
      <Nav className="justify-content-end navbar" role="tablist">
        <NavItem>
          <Button color="link" onClick={handleShareFile}>
            <i className="fas fa-share-alt" /> <span>Share</span>
          </Button>
        </NavItem>
        <NavItem>
          <Button color="link" onClick={handleShareFile}>
            <i className="fas fa-file-download" /> <span>Download</span>
          </Button>
        </NavItem>
        <NavItem>
          <Button color="link" onClick={handleShareFile}>
            <i className="fas fa-share-alt" /> <span>Rename</span>
          </Button>
        </NavItem>
        <NavItem>
          <Button color="link" onClick={handleShareFile}>
            <i className="fas fa-share-alt" /> <span>Move</span>
          </Button>
        </NavItem>
        <NavItem>
          <Button color="link" onClick={handleShareFile}>
            <i className="fas fa-share-alt" /> <span>Delete</span>
          </Button>
        </NavItem>
        <NavItem>
          <Button color="link" onClick={handleShareFile}>
            <i className="fas fa-share-alt" /> <span>Cancel</span>
          </Button>
        </NavItem>
      </Nav>
    </div>
  );
};

export default ActionBar;
