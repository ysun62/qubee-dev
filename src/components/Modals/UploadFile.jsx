import React, { useState } from "react";
import { toast } from "react-toastify";
import { FilePond, registerPlugin } from "react-filepond";
import { Button, Modal } from "reactstrap";
import config from "../../config";
import "react-toastify/dist/ReactToastify.css";
import "filepond/dist/filepond.min.css";

registerPlugin();

const UploadFile = ({ buttonLabel, buttonIcon, modalClassName, getFiles }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleOnError = (error, file, status) => {
    console.log(error, file, status);
  };

  const handleProcessedFiles = () => {
    getFiles();
    toggle();
  };

  return (
    <div className="file-upload-component">
      <Button
        block
        className="mb-3 bg-gradient-cyan"
        color="default"
        type="button"
        onClick={toggle}
      >
        {buttonIcon}
        <span className="btn-inner--text">{buttonLabel}</span>
      </Button>
      <Modal
        className={modalClassName}
        isOpen={modal}
        toggle={toggle}
        backdrop="static"
      >
        <div className="modal-header">
          <h5 className="modal-title" id="modal-title-default">
            File uploader
          </h5>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={toggle}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <FilePond
            //ref={(ref) => (pond = ref)}
            allowMultiple={true}
            name={"mediaFiles"}
            onerror={(error, file, status) =>
              handleOnError(error, file, status)
            }
            onprocessfiles={handleProcessedFiles}
            maxFiles={10}
            server={config.filesEndpoint}
          ></FilePond>
        </div>
      </Modal>
    </div>
  );
};

export default UploadFile;
