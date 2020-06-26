import React from "react";
import FileEditActions from "../Common/FileEditActions";
import { Container, Row, Col } from "reactstrap";

function ActionBarHeader({
  handleMove,
  handleFolderSelection,
  collection,
  selectedData,
  getFiles,
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
              handleMove={handleMove}
              handleFolderSelection={handleFolderSelection}
              collection={collection}
              selectedData={selectedData}
              getFiles={getFiles}
            />
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default ActionBarHeader;
