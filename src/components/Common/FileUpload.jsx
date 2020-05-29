import React, { Component } from "react";
import http from "../../services/httpService";
import { Form, FormGroup, Button, Input, Progress, Label } from "reactstrap";

class FileUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFiles: null,
      filenames: "Choose file",
      loaded: 0,
      tagNames: "",
      taskCompleted: "Waiting to upload",
    };

    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.maxSelectFile = this.maxSelectFile.bind(this);
  }

  maxSelectFile(e) {
    let files = e.target.files; // create file object

    if (files.length > 3) {
      const msg = "Only 3 files can be uploaded at a time";
      e.target.value = null; // discard selected file
      console.log(msg);
      return false;
    }
    return true;
  }

  handleFileChange(e) {
    let files = e.target.files;

    this.setState({
      selectedFiles: files,
      filenames: files.length + " files selected",
      loaded: 0,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    const files = this.state.selectedFiles;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("mediaFiles", files[i]);
    }

    try {
      const response = await http
        .post("http://localhost:5000/api/files", formData, {
          onUploadProgress: (ProgressEvent) => {
            this.setState({
              loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
              taskCompleted:
                this.state.loaded === 100
                  ? "Uploaded Successfully"
                  : "Waiting to upload",
            });
          },
        })
        .then(() => {
          this.props.getFiles();
        });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { loaded, filenames } = this.state;
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <div className="progress-wrapper" style={{ paddingTop: 0 }}>
            <div className="progress-info">
              {/* <div className="progress-label">
                <span>{this.state.taskCompleted}</span>
              </div> */}
              <div className="progress-percentage">
                <span>{Math.round(loaded, 2)}%</span>
              </div>
            </div>
            <Progress max="100" value={loaded} color="success" />
          </div>
          <div className="custom-file mb-4">
            <Input
              className="custom-file-input"
              type="file"
              multiple
              name="mediaFiles"
              id="mediaFiles"
              onChange={this.handleFileChange}
            />
            <Label className="custom-file-label" htmlFor="mediaFiles">
              {filenames}
            </Label>
          </div>
          <Button
            color="primary"
            type="submit"
            disabled={!this.state.selectedFiles}
          >
            Upload
          </Button>
        </Form>
      </>
    );
  }
}

export default FileUpload;
