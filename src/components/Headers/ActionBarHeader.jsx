import React from "react";
import FileEditActions from "../Common/FileEditActions";
import { Container, NavItem, NavLink, Nav, Button, Row, Col } from "reactstrap";

function ActionBarHeader({
  handleDelete,
  handleMove,
  handleFolderSelection,
  collection,
}) {
  return (
    <header className="action-bar fixed-top bg-secondary">
      <Container fluid>
        <Row>
          <Col md="3" className="d-md-block d-none">
            <div className="item-count">
              {/* <span>1 item selected</span> */}
            </div>
          </Col>
          <Col md="9">
            <FileEditActions
              handleDelete={handleDelete}
              handleMove={handleMove}
              handleFolderSelection={handleFolderSelection}
              collection={collection}
            />
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default ActionBarHeader;
