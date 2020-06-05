import React from "react";
import FilesHeader from "../components/Common/FilesHeader";
import FilesBody from "../components/Common/FilesBody";
import { Container, Row, Col, Card } from "reactstrap";

function Files({ files, folders, count, getFiles, isChecked }) {
  return (
    <>
      <Container className="pt-7" fluid>
        <Row className="">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow file-manager">
              <FilesHeader
                count={count}
                createFolderButton={true}
                getFiles={getFiles}
              />
              <FilesBody
                folders={folders}
                files={files}
                getFiles={getFiles}
                isChecked={isChecked}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Files;
