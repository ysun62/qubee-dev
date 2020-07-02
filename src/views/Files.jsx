import React, { useState } from "react";
import FilesHeader from "../components/Common/FilesHeader";
import FilesBody from "../components/Common/FilesBody";
import { Container, Row, Col, Card } from "reactstrap";

function Files({
  collection,
  getFiles,
  onSelectAll,
  isSelected,
  onCheckboxClick,
  setFolderId,
  getFolderId,
  setFileCount,
  getFileCount,
  ...props
}) {
  const [view, setView] = useState("list");

  const toggleView = (option) => {
    option === "list" ? setView("list") : setView("gallery");
  };

  return (
    <>
      <Container className="pt-7" fluid>
        <Row className="">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow file-manager">
              <FilesHeader
                {...props}
                collection={collection}
                createFolderButton={true}
                getFiles={getFiles}
                getFileCount={getFileCount}
                getFolderId={getFolderId}
                toggleView={toggleView}
              />
              <FilesBody
                {...props}
                view={view}
                collection={collection}
                getFiles={getFiles}
                onSelectAll={onSelectAll}
                isSelected={isSelected}
                onCheckboxClick={onCheckboxClick}
                setFolderId={setFolderId}
                setFileCount={setFileCount}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Files;
