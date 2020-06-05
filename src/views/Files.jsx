import React, { Component } from "react";
import http from "../services/httpService";
import FilesHeader from "../components/Common/FilesHeader";
import FilesBody from "../components/Common/FilesBody";
import config from "../config";
//import Header from "components/Headers/Header";
import { Container, Row, Col, Card } from "reactstrap";

function Files({ files, folders, count, getNewData, isFileChecked }) {
  return (
    <>
      {/* Page content */}
      <Container className="pt-7" fluid>
        <Row className="">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow file-manager">
              <FilesHeader
                count={count}
                createFolderButton={true}
                getNewData={getNewData}
              />
              <FilesBody
                folders={folders}
                files={files}
                getNewData={getNewData}
                isFileChecked={isFileChecked}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Files;
