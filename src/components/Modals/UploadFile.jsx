import React, { useState } from "react";
import FileUpload from "../Common/FileUpload";
import { Button, Modal } from "reactstrap";

const UploadFile = ({
  buttonLabel,
  buttonIcon,
  modalClassName,
  getNewData,
}) => {
  let buttonIconClasses = "fas fa-";

  if (buttonIcon) buttonIconClasses += buttonIcon;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div className="file-upload-component">
      <Button
        block
        className="mb-3 bg-gradient-cyan"
        color="default"
        type="button"
        onClick={toggle}
      >
        <span className="btn-inner--icon">
          <i className={buttonIconClasses} />
        </span>
        <span className="btn-inner--text">{buttonLabel}</span>
      </Button>
      <Modal
        className={modalClassName}
        isOpen={modal}
        toggle={toggle}
        getNewData={getNewData}
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
          <FileUpload onClick={toggle} data="modal" />
        </div>
      </Modal>
    </div>
  );
};

export default UploadFile;
