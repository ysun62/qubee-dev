import React, { Component } from "react";
import http from "../services/httpService";
import CreateFolder from "../components/Modals/CreateFolder";
import config from "../config";
//import Header from "components/Headers/Header";
import {
  Container,
  Row,
  //Button,
  Media,
  Table,
  Col,
  Card,
  CardHeader,
} from "reactstrap";
import { NavLink } from "react-router-dom";

class Folders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      folders: [],
      metaTags: [],
      checkedItems: new Map(),
      count: 0,
    };
  }

  async componentDidMount() {
    this.getFiles();
  }

  getFiles = async (id = "5edab535988b0dc144aee8fe") => {
    const { data: files } = await http.get(config.filesEndpoint + "/" + id);
    const { data: folders } = await http.get(config.foldersEndpoint + "/" + id);
    this.setState({ files, folders, count: files.length + folders.length });
  };

  handleDelete = async (file) => {
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
                      <h3 className="mb-0">All {this.state.count}</h3>
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
                    {this.state.folders.map((folder) => (
                      <tr key={folder._id}>
                        <th scope="row">
                          <div className="custom-control custom-checkbox mb-4">
                            <input
                              className="custom-control-input"
                              id={folder._id}
                              type="checkbox"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={folder._id}
                            ></label>
                          </div>
                        </th>
                        <td>
                          <Media className="align-items-center">
                            <NavLink
                              className=""
                              to={`/${folder.folderRelativePath}`}
                            >
                              <i className="ni ni-folder-17 mr-3"></i>
                              <span className="mb-0 text-sm">
                                {folder.name}
                              </span>
                            </NavLink>
                          </Media>
                          {/* <Button
                            color="danger"
                            onClick={() => this.handleDelete(file)}
                          >
                            Delete
                          </Button> */}
                        </td>
                        <td>{folder.dateAdded}</td>
                        <td></td>
                      </tr>
                    ))}
                    {this.state.files.map((file) => (
                      <tr key={file._id}>
                        <th scope="row">
                          <div className="custom-control custom-checkbox mb-4">
                            <input
                              className="custom-control-input"
                              id={file._id}
                              type="checkbox"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={file._id}
                            ></label>
                          </div>
                        </th>
                        <td>
                          <Media className="align-items-center">
                            <a href={file.fileUrl} target="blank">
                              <i className="ni ni-image mr-3"></i>
                              <span className="mb-0 text-sm">{file.name}</span>
                            </a>
                          </Media>
                          {/* <Button
                            color="danger"
                            onClick={() => this.handleDelete(file)}
                          >
                            Delete
                          </Button> */}
                        </td>
                        <td>{file.dateAdded}</td>
                        <td>{file.fileSize}</td>
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

export default Folders;
