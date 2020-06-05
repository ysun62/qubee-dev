import React, { useState } from "react";
import http from "../../services/httpService";
import confid from "../../config";
import { Button, Modal, Form, Input } from "reactstrap";

const CreateFolder = (props) => {
  const { buttonLabel, buttonIcon, modalClassName, getFiles } = props;
  let buttonIconClasses = "ni ni-";
  if (buttonIcon) buttonIconClasses += buttonIcon;

  const [modal, setModal] = useState(false);
  const [inputField, setInputField] = useState("");

  const toggle = () => setModal(!modal);

  const handleOnChange = (e) => setInputField(e.currentTarget.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await http
      .post(confid.foldersEndpoint, {
        name: inputField,
      })
      .then((response) => {
        getFiles(); // Update parent component view
        toggle(e);
        console.log(response);
      })
      .catch((ex) => console.log(ex));
  };

  return (
    <div className="file-upload-component">
      <Button color="secondary" type="button" onClick={toggle}>
        <span className="btn-inner--icon">
          <i className={buttonIconClasses} />
        </span>
        <span className="btn-inner--text">{buttonLabel}</span>
      </Button>
      <Modal className={modalClassName} isOpen={modal} toggle={toggle}>
        <div className="modal-header">
          <h5 className="modal-title" id="modal-title-default">
            Create new folder
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
              name="folderName"
              id="folderName"
              placeholder="Type folder name"
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

export default CreateFolder;
