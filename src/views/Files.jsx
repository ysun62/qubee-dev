import React, { Component } from "react";
import http from "../services/httpService";
import CreateFolder from "../components/Modals/CreateFolder";
import config from "../config";
//import Header from "components/Headers/Header";
import {
  Container,
  Row,
  //Button,
  Badge,
  Media,
  Table,
  Col,
  Card,
  CardHeader,
} from "reactstrap";
import { NavLink, Link } from "react-router-dom";

class Files extends Component {
  state = {
    files: [],
    folders: [],
    metaTags: [],
  };

  async componentDidMount() {
    const { data: files } = await http.get(config.filesEndpoint);
    const { data: folders } = await http.get(config.foldersEndpoint);
    this.setState({ files, folders });
  }

  handleDelete = async (file) => {
    const originalFiles = this.state.files;

    const files = this.state.files.filter((p) => p._id !== file._id);
    this.setState({ files });

    try {
      await http.delete(`${config.filesEndpoint}/${file._id}`);
      //throw new Error("Something went wrong!");
    } catch (err) {
      // Expected (404: not found, 400: bad request) - Client Errors
      // - Display a specific error message
      if (err.response && err.response.status === 404)
        alert("This file has already been deleted.");
      this.setState({ files: originalFiles });
    }
  };

  handleFileSizeConversion(bytes, si) {
    var thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
      return bytes + " B";
    }
    var units = si
      ? ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
      : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
    var u = -1;
    do {
      bytes /= thresh;
      ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1) + " " + units[u];
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
                            <Link to={`/admin/folder/${folder.folderPath}`}>
                              <i className="fas fa-folder-open mr-2" />
                              <span className="mb-0 text-sm">
                                {folder.folderName}
                              </span>
                            </Link>
                          </Media>
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
                          <Media className="align-items-center mb-2">
                            <a href={file.filePath} target="blank">
                              <i class="fas fa-file-image mr-2" />
                              <span className="mb-0 text-sm">
                                {file.fileName}
                              </span>
                            </a>
                          </Media>
                          {file.metaTags.map((tag, i) => (
                            <Badge
                              key={tag + i}
                              className="badge-default mr-2"
                              pill
                            >
                              <a href="#pablo">{tag}</a>
                            </Badge>
                          ))}
                        </td>
                        <td>{file.dateAdded}</td>
                        <td>
                          {this.handleFileSizeConversion(file.fileSize, true)}
                        </td>
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

export default Files;
