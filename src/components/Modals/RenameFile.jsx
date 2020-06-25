import React, { useState } from "react";
import { saveFolder } from "../../services/folderService";
import { Button, Modal, Form, Input } from "reactstrap";

const RenameFile = ({
  buttonLabel,
  buttonIcon,
  disable,
  modalClassName,
  collection,
  selectedData,
  getFiles,
}) => {
  const [modal, setModal] = useState(false);
  const [inputField, setInputField] = useState("");

  const toggle = () => {
    // Update parent component view
    getFiles();
    setModal(!modal);
  };

  const handleOnChange = (e) => setInputField(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: Update the parents property with the correct IDs
    const folderName = {
      name: inputField,
      parentDirectoryId: Object.values(selectedData)[0]._id,
    };

    await saveFolder(folderName)
      .then((response) => {
        toggle();
      })
      .catch((ex) => console.log(ex));
  };

  console.log(Object.values(selectedData)[0]._id);

  return (
    <div className="file-upload-component">
      <Button color="link" type="button" onClick={toggle} disabled={disable}>
        {buttonIcon}
        <span className="btn-inner--text">{buttonLabel}</span>
      </Button>
      <Modal className={modalClassName} isOpen={modal} toggle={toggle}>
        <div className="modal-header">
          <h5 className="modal-title" id="modal-title-default">
            Rename
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
        <Form onSubmit={handleSubmit}>
          <div className="modal-body">
            <Input
              type="text"
              name="rename"
              id="rename"
              value={inputField}
              onChange={handleOnChange}
            />
          </div>
          <div className="modal-footer">
            <div className="text-center">
              <Button data-dismiss="modal" color="link" onClick={toggle}>
                Cancel
              </Button>
              <Button color="primary" disabled={!inputField} type="submit">
                Create
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default RenameFile;
