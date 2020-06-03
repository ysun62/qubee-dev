import React, { Component } from "react";
import http from "../services/httpService";
import CreateFolder from "../components/Modals/CreateFolder";
import FilesTable from "../components/Common/FilesTable";
import config from "../config";
//import Header from "components/Headers/Header";
import { Container, Row, Col, Card, CardHeader } from "reactstrap";

class Files extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      folders: [],
      count: 0,
    };
  }

  async componentDidMount() {
    this.getFiles();
  }

  getFiles = async () => {
    const { data: files } = await http.get(config.filesEndpoint);
    const { data: folders } = await http.get(config.foldersEndpoint);
    this.setState({ files, folders, count: files.length + folders.length });
  };

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

  handleChange = (e) => {
    const item = e.target.id;
    const isChecked = e.target.checked;
    console.log(isChecked);

    // this.setState((prevState) => ({
    //   checkedItems: prevState.checkedItems.set(item, isChecked),
    // }));
    // console.log(e.target.id);
  };

  handleChecked = () => {
    console.log("Checked");
  };

  render() {
    const { files, folders, count } = this.state;

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
                      <h3 className="mb-0">All {count}</h3>
                    </div>
                    <div className="col text-right">
                      <CreateFolder
                        buttonLabel="Create new folder"
                        modalClassName="modal-dialog"
                      />
                    </div>
                  </Row>
                </CardHeader>
                <FilesTable
                  folders={folders}
                  files={files}
                  onChange={this.handleChange}
                  getNewData={this.getFiles}
                />
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Files;
