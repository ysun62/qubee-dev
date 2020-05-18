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
      selectedFiles: null,
      filenames: "Choose file",
      loaded: 0,
      mediaTags: [],
      tagNames: "",
      taskCompleted: "Waiting to upload",
    };

    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMediaTags = this.handleMediaTags.bind(this);
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
    let files = e.target.files[0];
    //let selectedFiles = this.state.selectedFiles;

    //selectedFiles.push(files);

    this.setState({
      selectedFiles: files,
      filenames: files.name,
      loaded: 0,
      uploadedFile: {},
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("mediaFile", this.state.selectedFiles);

    try {
      http
        .post("http://localhost:5000/images", formData, {
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
        .then((response) => {
          console.log(response.data);
        });

      // Process selected files in FilePond
      //this.pond.processFiles();
    } catch (err) {
      console.log(err);
    }
  }

  async handleMediaTags(e) {
    const allTags = e.currentTarget.value;
    const tagArray = allTags.split(",");
    this.setState({ mediaTags: tagArray, tagNames: allTags });
  }

  render() {
    const { loaded, filenames } = this.state;
    return (
      <>
        {/* <Form method="POST">
          <FilePond
            ref={(ref) => (this.pond = ref)}
            allowMultiple={true}
            allowFileEncode={true}
            allowFileMetadata={true}
            instantUpload={false}
            dropOnPage={true}
            maxFiles={10}
            name="file"
            checkValidity={true}
            dropValidation={true}
            chunkUploads={true}
            onupdatefiles={(fileItems) => {
              this.setState({
                selectedFiles: fileItems.map((fileItem) => fileItem.file),
              });
            }}
            server="http://localhost:5000/images"
          />

          </FormGroup>
          <div className="text-right">
            <Button
              color="link"
              data-dismiss={this.props.data}
              type="button"
              onClick={this.props.onClick}
            >
              Cancel
            </Button>
            <Button color="primary" onClick={() => this.pond.processFiles()}>
              Upload
            </Button>
          </div>
        </Form> */}
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
              name="mediaFile"
              id="mediaFile"
              onChange={this.handleFileChange}
            />
            <Label className="custom-file-label" htmlFor="customFile">
              {filenames}
            </Label>
          </div>
          <FormGroup>
            <Input
              name="mediaTags"
              id="mediaTags"
              placeholder="Add tags seperated by a comma (,)"
              type="text"
              value={this.state.tagNames}
              onChange={this.handleMediaTags}
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
