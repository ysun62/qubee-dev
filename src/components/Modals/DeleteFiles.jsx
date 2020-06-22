import React, { useState } from "react";
import { Button, Modal } from "reactstrap";
import { deleteFile } from "../../services/fileService";
import { deleteFolder } from "../../services/folderService";

const DeleteFiles = ({
  buttonLabel,
  buttonIcon,
  modalClassName,
  collection,
  selectedData,
  getFiles,
}) => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    // Refresh file list
    getFiles();
    setModal(!modal);
  };

  const onHandleDelete = () => {
    const fileIds = Object.keys(selectedData);
    const dataCache = collection.dataCache;

    // Loop through all selected file IDs
    fileIds.map(async (id) => {
      // Find the model in the collection that match the selected file ID
      const model = dataCache.find((data) => data._id === id);
      const modelChildren = dataCache.filter(
        (data) => data.parentDirectoryId === id
      );

      console.log(modelChildren);

      // TODO: Rework this code block to delete files inside folders if they exist
      if (model.kind === "FOLDER") {
        // if (modelChildren.length) {
        //   await deleteFile(id).then(() => toggle());
        // } else {

        await deleteFolder(id).then(() => toggle());
        //}
      } else {
        await deleteFile(id).then(() => toggle());
      }
    });
  };

  return (
    <>
      <Button color="link" type="button" onClick={toggle}>
        {buttonIcon}
        <span className="btn-inner--text">{buttonLabel}</span>
      </Button>
      <Modal className={modalClassName} isOpen={modal} toggle={toggle}>
        <div className="modal-header">
          <h5 className="modal-title" id="modal-title-default">
            Delete
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
        <div className="modal-body" style={{ textAlign: "center" }}>
          <p>Deleted items are removed from Qubee permanently.</p>
          <p>Do you wish to proceed?</p>
        </div>
        <div className="modal-footer">
          <div className="text-center">
            <Button data-dismiss="modal" color="link" onClick={toggle}>
              Cancel
            </Button>
            <Button color="primary" type="submit" onClick={onHandleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteFiles;
