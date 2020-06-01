import React, { Component } from "react";
import http from "../services/httpService";
import CreateFolder from "../components/Modals/CreateFolder";
import config from "../config";
import fileSizeConversion from "../utils/fileSizeConversion";
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

class SearchResults extends Component {
  state = {
    results: [],
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

  displayResults() {
    const props = this.props.location.state.results;
    if (props) {
      this.setState({ results: props });
    } else {
      this.setState({ results: [] });
    }
  }

  async handleDelete(file) {
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
  }

  render() {
    return (
      <>
        {/* Page content */}
        <Container className="pt-7" fluid>
          <Row className="">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow file-manager">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3>ID - {this.props.match.params.id}</h3>
                      <h3 className="mb-0">All 3</h3>
                    </div>
                    <div className="col text-right">
                      <CreateFolder
                        buttonLabel="Create new folder"
                        modalClassName="modal-dialog"
                      />
                    </div>
                  </Row>
                </CardHeader>
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
                              <span className="mb-0 text-sm">
                                {result.name}
                              </span>
                            </a>
                          </Media>
                          {result.metaTags.map((tag, i) => (
                            <Badge
                              key={tag + i}
                              className="badge-default mr-2"
                              pill
                            >
                              <a href="#pablo">{tag}</a>
                            </Badge>
                          ))}
                        </td>
                        <td>{result.dateAdded}</td>
                        <td>{fileSizeConversion(result.size, true)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default SearchResults;
