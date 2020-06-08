import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, Modal } from "reactstrap";
import config from "../../config";
import UploadFolderPicker from "../Common/UploadFolderPicker";
import "react-toastify/dist/ReactToastify.css";

const MoveFiles = ({
  buttonLabel,
  buttonIcon,
  modalClassName,
  handleMove,
  folders,
  handleFolderSelection,
}) => {
  let buttonIconClasses = "fas fa-";

  if (buttonIcon) buttonIconClasses += buttonIcon;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleProcessedFiles = () => {
    handleMove();
    toggle();
  };

  return (
    <>
      <Button block color="link" type="button" onClick={toggle}>
        <span className="btn-inner--icon">
          <i className={buttonIconClasses} />
        </span>
        <span className="btn-inner--text">{buttonLabel}</span>
      </Button>
      <Modal className={modalClassName} isOpen={modal} toggle={toggle}>
        <div className="modal-header">
          <h5 className="modal-title" id="modal-title-default">
            Move
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
          <UploadFolderPicker
            folders={folders}
            handleFolderSelection={handleFolderSelection}
          />
        </div>
        <div className="modal-footer">
          <div className="text-center">
            <Button data-dismiss="modal" color="link" onClick={toggle}>
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
              onClick={handleProcessedFiles}
            >
              Move to Foldername
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MoveFiles;
