import React, { useState } from "react";
import { Button, Modal } from "reactstrap";
// import { saveFolder } from "../../services/folderService";
import { saveFile } from "../../services/fileService";
import UploadFolderPicker from "../Common/UploadFolderPicker";
import "react-toastify/dist/ReactToastify.css";

const MoveFiles = ({
  buttonLabel,
  buttonIcon,
  modalClassName,
  collection,
  selectedData,
  getFiles,
}) => {
  const [modal, setModal] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState();

  const toggle = () => {
    getFiles();
    setModal(!modal);
  };

  const handleProcessedFiles = () => {
    const files = Object.values(selectedData);
    // const models = collection.models;

    // Loop through all selected file IDs
    files.map(async (file) => {
      // Find the model in the collection that match the selected file ID
      // const model = models.find((m) => m._id === id);
      file.parentDirectoryId = selectedFolderId;
      // const modelChildren = models.filter(
      //   (data) => data.parentDirectoryId === id
      // );

      await saveFile(file).then(() => toggle());

      // TODO: Rework this code block to delete files inside folders if they exist
      // if (model.kind === "FOLDER") {
      // if (modelChildren.length) {
      //   await deleteFile(id).then(() => toggle());
      // } else {

      // await saveFolder(id).then(() => toggle());
      //}
      // } else {

      // }
    });
  };

  const selectFolderId = (id) => {
    console.log(id);
    setSelectedFolderId(id);
  };

  return (
    <>
      <Button block color="link" type="button" onClick={toggle}>
        {buttonIcon}
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
            collection={collection}
            selectedData={selectedData}
            selectedFolderId={selectFolderId}
          />
        </div>
        <div className="modal-footer">
          <div className="text-center">
            <Button data-dismiss="modal" color="link" onClick={toggle}>
              Cancel
            </Button>
            {/* TODO: Display the folder name on the button. */}
            <Button
              color="primary"
              type="button"
              onClick={handleProcessedFiles}
            >
              Move
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MoveFiles;
