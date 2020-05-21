import React, { Component } from "react";
import http from "../../services/httpService";
// import { FilePond, registerPlugin } from "react-filepond";
// import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
// import FilePondPluginImageResize from "filepond-plugin-image-resize";
// import FilePondPluginFileRename from "filepond-plugin-file-rename";
// import FilePondPluginFileEncode from "filepond-plugin-file-encode";
// import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
// import FilePondPluginFileMetadata from "filepond-plugin-file-metadata";
import "filepond/dist/filepond.min.css";
import { Form, FormGroup, Button, Input, Progress, Label } from "reactstrap";

// registerPlugin(
//   FilePondPluginImageExifOrientation,
//   FilePondPluginImageResize,
//   FilePondPluginFileRename,
//   FilePondPluginFileEncode,
//   FilePondPluginFileValidateType,
//   FilePondPluginFileMetadata
// );

class FileUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFiles: [],
      filenames: "Choose file",
      loaded: 0,
      metaTags: [],
      tagNames: "",
      taskCompleted: "Waiting to upload",
    };

    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMetaTags = this.handleMetaTags.bind(this);
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

  async handleFileChange(e) {
    let files = e.target.files;

    this.setState({
      selectedFiles: files,
      filenames: files.length + " files selected",
      loaded: 0,
    });
  }

  async handleMetaTags(e) {
    const allTags = e.currentTarget.value;
    const tagArray = allTags.split(",");
    this.setState({ metaTags: tagArray, tagNames: allTags });
  }

  async handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    for (const file of this.state.selectedFiles) {
      formData.append("mediaFiles", file);
    }

    // for (const tag of this.state.metaTags) {
    //   formData.append("metaTags", tag);
    // }

    // console.log(
    //   this.state.selectedFiles,
    //   this.state.filenames,
    //   this.state.metaTags,
    //   formData
    // );

    try {
      http
        .post("http://localhost:5000/files", formData, {
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
        .then((res) => {
          console.log(res);
        });

      // Process selected files in FilePond
      //this.pond.processFiles();
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { loaded, filenames } = this.state;
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <div className="progress-wrapper">
            <div className="progress-info">
              <div className="progress-label">
                {/* <span>{this.state.taskCompleted}</span> */}
              </div>
              <div className="progress-percentage">
                <span>{Math.round(loaded, 2)}%</span>
              </div>
            </div>
            <Progress max="100" value={loaded} color="success" />
          </div>
          <div className="custom-file mb-4">
            <Input
              type="file"
              className="custom-file-input filepond"
              multiple
              name="mediaFiles"
              id="mediaFiles"
              onChange={this.handleFileChange}
            />
            <Label className="custom-file-label" htmlFor="customFile">
              {filenames}
            </Label>
          </div>
          <FormGroup>
            <Input
              name="metaTags"
              id="metaTags"
              placeholder="Add tags seperated by a comma (,)"
              type="text"
              value={this.state.tagNames}
              onChange={this.handleMetaTags}
            />
          </FormGroup>
          <Button color="primary" type="submit">
            Upload
          </Button>
        </Form>
      </>
    );
  }
}

export default FileUpload;
