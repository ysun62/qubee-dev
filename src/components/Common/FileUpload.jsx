import React, { Component } from "react";
import http from "../../services/httpService";
import { toast } from "react-toastify";
import { FilePond, registerPlugin } from "react-filepond";
import { Form, Button, Input, Progress, Label } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import "filepond/dist/filepond.min.css";

class FileUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFiles: [],
      filenames: "Choose file",
      loaded: 0,
      taskCompleted: "Pending",
      isEnabled: false,
    };

    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.maxSelectFile = this.maxSelectFile.bind(this);
  }

  maxSelectFile(files) {
    //let files = e.target.files; // create file object

    if (files.length > 10) {
      const msg = "Only 10 files can be uploaded at a time";
      //e.target.value = null; // discard selected file
      toast.error(msg);
      return false;
    }
    return true;
  }

  handleFileChange(e) {
    let files = e.target.files;

    if (this.maxSelectFile(files)) {
      this.setState({
        selectedFiles: files,
        filenames: files.length + " files selected",
        loaded: 0,
        isEnabled: true,
      });
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    const files = this.state.selectedFiles;
    const formData = new FormData();

    console.log(files);

    for (let i = 0; i < files.length; i++) {
      formData.append("mediaFiles", files[i]);
    }

    await http
      .post("http://localhost:5000/api/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }

  handleError(err, file) {
    console.log(err, file);
  }

  render() {
    const { loaded, filenames, isEnabled } = this.state;
    return (
      <>
        <FilePond
          ref={(ref) => (this.pond = ref)}
          allowMultiple={true}
          chunkUploads={true}
          name={"files"}
          onprocessfile={(err, file) => this.handleError(err, file)}
          maxFiles={10}
          server="http://localhost:5000/api/files"
        ></FilePond>
        <Form onSubmit={this.handleSubmit}>
          <div className="progress-wrapper" style={{ paddingTop: 0 }}>
            <div className="progress-info">
              <div className="progress-label">
                <span>{this.state.taskCompleted}</span>
              </div>
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
          <Button color="primary" type="submit" disabled={!isEnabled}>
            Upload
          </Button>
        </Form>
      </>
    );
  }
}

export default FileUpload;
