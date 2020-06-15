import React, { Component } from "react";
import { deleteFile } from "../services/fileService";
import fileSizeConversion from "../utils/fileSizeConversion";
import FilesHeader from "../components/Common/FilesHeader";
import {
  Container,
  Row,
  Media,
  Table,
  Col,
  Card,
  CardBody,
  CardText,
} from "reactstrap";

class SearchResults extends Component {
  state = {
    results: [],
    count: 0,
  };

  componentDidMount() {
    this.displayResults();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.location.state.results !== prevProps.location.state.results
    ) {
      this.displayResults();
    }
  }

  displayResults = () => {
    const props = this.props.location.state.results;
    if (props) {
      this.setState({ results: props, count: props.length });
    } else {
      this.setState({ results: [] });
    }
  };

  handleDelete = async (file) => {
    const originalFiles = this.state.files;

    const files = this.state.files.filter((p) => p._id !== file._id);
    this.setState({ files });

    try {
      await deleteFile(file._id);
      //throw new Error("Something went wrong!");
    } catch (err) {
      // Expected (404: not found, 400: bad request) - Client Errors
      // - Display a specific error message
      if (err.response && err.response.status === 404)
        alert("This file has already been deleted.");
      this.setState({ files: originalFiles });
    }
  };

  render() {
    const hasResults = this.state.results.length > 0;
    let SearchResultsView;
    if (hasResults) {
      SearchResultsView = (
        <Table
          className="align-items-center table-flush"
          hover
          responsive
          size="sm"
        >
          <thead className="thead-light">
            <tr>
              <th scope="col" width="76">
                <div className="custom-control custom-checkbox mb-3">
                  <input
                    className="custom-control-input"
                    id="check-all"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="check-all"
                  ></label>
                </div>
              </th>
              <th scope="col" width="50%">
                File Name
              </th>
              <th scope="col">Date Added</th>
              <th scope="col">Size</th>
            </tr>
          </thead>
          <tbody>
            {this.state.results.map((result) => (
              <tr key={result._id}>
                <th scope="row">
                  <div className="custom-control custom-checkbox mb-4">
                    <input
                      className="custom-control-input"
                      id={result._id}
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor={result._id}
                    ></label>
                  </div>
                </th>
                <td>
                  <Media className="align-items-center mb-2">
                    <a href={result.path} target="blank">
                      <i className="fas fa-file-image mr-2" />
                      <span className="mb-0 text-sm">{result.name}</span>
                    </a>
                  </Media>
                </td>
                <td>{result.dateAdded}</td>
                <td>{fileSizeConversion(result.size, true)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    } else {
      SearchResultsView = (
        <CardBody>
          <CardText style={{ textAlign: "center" }}>
            <strong>No results found</strong>
            <br />
            Please try again.
          </CardText>
        </CardBody>
      );
    }
    return (
      <>
        {/* Page content */}
        <Container className="pt-7" fluid>
          <Row className="">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow file-manager">
                <FilesHeader
                  count={this.state.count}
                  createFolderButton={false}
                />
                {SearchResultsView}
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default SearchResults;
