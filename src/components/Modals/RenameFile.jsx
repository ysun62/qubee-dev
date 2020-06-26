import React, { useState } from "react";
import { saveFolder } from "../../services/folderService";
import { saveFile } from "../../services/fileService";
import {
  Button,
  Modal,
  Form,
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

const RenameFile = ({
  buttonLabel,
  buttonIcon,
  disable,
  modalClassName,
  selectedData,
  getFiles,
}) => {
  const selectedDataObj = Object.values(selectedData)[0];
  const [modal, setModal] = useState(false);
  const [inputField, setInputField] = useState(selectedDataObj.name);

  const toggle = () => {
    // Update parent component view
    getFiles();
    setModal(!modal);
  };

  const handleOnChange = (e) => setInputField(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedName = {
      name: inputField,
      slug: inputField.replace(/\s+/g, "-").toLowerCase(),
      _id: selectedDataObj._id,
    };

    if (selectedDataObj.kind === "FOLDER") {
      await saveFolder(updatedName)
        .then(() => {
          toggle();
        })
        .catch((ex) => console.log(ex));
    } else {
      await saveFile(updatedName)
        .then(() => {
          toggle();
        })
        .catch((ex) => console.log(ex));
    }
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
            <InputGroup>
              <Input
                type="text"
                name="rename"
                id="rename"
                value={inputField}
                onChange={handleOnChange}
              />
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  .{selectedDataObj.fileExtension}
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
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
