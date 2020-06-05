import React from "react";
import FileEditActions from "components/ActionBars/FileEditActions";
import { Container, NavItem, NavLink, Nav, Button, Row, Col } from "reactstrap";

function ActionBar({ handleDelete }) {
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
            <FileEditActions handleDelete={handleDelete} />
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default ActionBar;
