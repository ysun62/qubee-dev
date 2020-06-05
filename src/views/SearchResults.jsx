import React, { useState, useEffect } from "react";
import http from "../services/httpService";
import CreateFolder from "../components/Modals/CreateFolder";
import config from "../config";
import fileSizeConversion from "../utils/fileSizeConversion";
import FilesHeader from "../components/Common/FilesHeader";
import FilesBody from "../components/Common/FilesBody";
import {
  Container,
  Row,
  Media,
  Table,
  Col,
  Card,
  CardHeader,
  Badge,
} from "reactstrap";
import { NavLink } from "react-router-dom";

function SearchResults({ files, folders, count, getNewData }) {
  const [results, setResults] = useState([]);

  useEffect(() => displayResults());

  // componentDidMount() {
  //   this.displayResults();
  // }

  // componentDidUpdate(prevProps) {
  //   if (
  //     this.props.location.state.results !== prevProps.location.state.results
  //   ) {
  //     this.displayResults();
  //   }
  // }

  const displayResults = () => {
    // const props = this.props.location.state.results;
    // if (props) {
    //   this.setState({ results: props });
    // } else {
    //   this.setState({ results: [] });
    // }
  };

  const handleDelete = async (file) => {
    const originalFiles = this.state.files;

    const files = this.state.files.filter((p) => p._id !== file._id);
    this.setState({ files });

    try {
      await http.delete(`${config.apiEndpoint}/${file._id}`);
      //throw new Error("Something went wrong!");
    } catch (err) {
      // Expected (404: not found, 400: bad request) - Client Errors
      // - Display a specific error message
      if (err.response && err.response.status === 404)
        alert("This file has already been deleted.");
      this.setState({ files: originalFiles });
    }
  };

  return (
    <>
      {/* Page content */}
      <Container className="pt-7" fluid>
        <Row className="">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow file-manager">
              <FilesHeader
                count={count}
                createFolderButton={false}
                getNewData={getNewData}
              />
              <FilesBody
                folders={folders}
                files={files}
                getNewData={getNewData}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SearchResults;
