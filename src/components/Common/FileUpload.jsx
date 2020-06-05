import React, { useState } from "react";
import http from "../../services/httpService";
import { toast } from "react-toastify";
import { FilePond, registerPlugin } from "react-filepond";
// import { Form, Button, Input, Progress, Label } from "reactstrap";
import config from "../../config";
import "react-toastify/dist/ReactToastify.css";
import "filepond/dist/filepond.min.css";

registerPlugin();

function FileUpload({ getFiles, toggle }) {
  // const [selectedFiles, setSelectedFiles] = useState([]);
  // const [filenames, setFilenames] = useState("Choose file");
  // const [loaded, setLoaded] = useState(0);
  // const [taskCompleted, setTaskCompleted] = useState("Pending");
  // const [isEnabled, setEnabled] = useState(false);

  // maxSelectFile = (files) => {
  //   //let files = e.target.files; // create file object

  //   if (files.length > 10) {
  //     const msg = "Only 10 files can be uploaded at a time";
  //     //e.target.value = null; // discard selected file
  //     toast.error(msg);
  //     return false;
  //   }
  //   return true;
  // };

  // const handleFileChange = (e) => {
  //   let files = e.target.files;

  //   if (this.maxSelectFile(files)) {
  //     this.setState({
  //       selectedFiles: files,
  //       filenames: files.length + " files selected",
  //       loaded: 0,
  //       isEnabled: true,
  //     });
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const files = this.state.selectedFiles;
  //   const formData = new FormData();

  //   console.log(files);

  //   for (let i = 0; i < files.length; i++) {
  //     formData.append("mediaFiles", files[i]);
  //   }

  //   await http
  //     .post(config.filesEndpoint, formData, {
  //       onUploadProgress: (ProgressEvent) => {
  //         this.setState({
  //           loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
  //           taskCompleted:
  //             this.state.loaded === 100
  //               ? "Uploaded Successfully"
  //               : "Waiting to upload",
  //         });
  //       },
  //     })
  //     .then((response) => {
  //       this.getNewData();
  //       this.toggle();
  //       console.log(response);
  //     })
  //     .catch((ex) => console.log(ex));
  // };

  const handleOnError = (error, file, status) => {
    console.log(error, file, status);
  };

  const handleProcessedFiles = () => {
    getFiles();
    toggle();
  };

  return (
    <>
      <FilePond
        //ref={(ref) => (pond = ref)}
        allowMultiple={true}
        name={"mediaFiles"}
        onerror={(error, file, status) => handleOnError(error, file, status)}
        onprocessfiles={handleProcessedFiles}
        maxFiles={10}
        server={config.filesEndpoint}
      ></FilePond>
      {/* <Form onSubmit={this.handleSubmit}>
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
        </Form> */}
    </>
  );
}

export default FileUpload;
