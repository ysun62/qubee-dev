import React, { useState } from "react";
import http from "../../services/httpService";
import { Button, Modal, Form, Input, Progress } from "reactstrap";

const UploadFile = (props) => {
  const { buttonLabel, buttonIcon, modalClassName } = props;
  let buttonIconClasses = "ni ni-";
  if (buttonIcon) buttonIconClasses += buttonIcon;

  const [modal, setModal] = useState(false);
  const [inputField, setInputField] = useState("");

  const toggle = () => setModal(!modal);

  const handleOnChange = (e) => setInputField(e.currentTarget.value);

  const handleDisabled = () => {
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("folderName", inputField);

    try {
      const res = http
        .post("http://localhost:5000/folders", formData, {})
        .then((response) => {
          console.log(response);
          this.props.history.push("/folder")
        });
      console.log(res);
    } catch (err) {
      console.log(err);

      // if (err.response.status === 500) {
      //   console.log("There was a problem with the server!");
      // } else {
      //   console.log(err.response.data.msg);
      // }
    }
  };

  return (
    <div className="file-upload-component">
      <Button color="secondary" type="button" size="sm" onClick={toggle}>
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
        <Form method="POST" onSubmit={handleSubmit}>
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
              <Button
                color="primary"
                disabled={!inputField}
                type="submit"
                // onClick={handleOnClick}
              >
                Create
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default UploadFile;
