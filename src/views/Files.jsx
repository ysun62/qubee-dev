import React from "react";
import FilesHeader from "../components/Common/FilesHeader";
import FilesBody from "../components/Common/FilesBody";
import { Container, Row, Col, Card } from "reactstrap";

function Files({
  collection,
  getFiles,
  onSelectAll,
  isSelected,
  onCheckboxChange,
}) {
  return (
    <>
      <Container className="pt-7" fluid>
        <Row className="">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow file-manager">
              <FilesHeader
                collection={collection}
                createFolderButton={true}
                getFiles={getFiles}
              />
              <FilesBody
                collection={collection}
                getFiles={getFiles}
                onSelectAll={onSelectAll}
                // isSelected={isSelected}
                onCheckboxChange={onCheckboxChange}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Files;
