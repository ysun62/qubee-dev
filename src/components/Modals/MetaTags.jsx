import React, { useState, useEffect } from "react";
import http from "../../services/httpService";
import config from "../../config";
import { Button, Modal, Form, Input, Badge } from "reactstrap";

const MetaTag = (props) => {
  const { buttonLabel, modalClassName, fileId, getNewData } = props;
  const [modal, setModal] = useState(false);
  const [inputField, setInputField] = useState("");
  const [file, setFile] = useState([]);
  const [unmountOnClose, setUnmountOnClose] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await http.get(config.filesEndpoint + "/" + fileId);
      setFile(data);

      const tags = data.metaTags.join(", ");
      setInputField(tags);
    }
    fetchData();
  }, [fileId]);

  const changeUnmountOnClose = (e) => {
    let value = e.target.value;
    setUnmountOnClose(JSON.parse(value));
  };

  const toggle = () => setModal(!modal);

  const handleOnChange = (e) => setInputField(e.currentTarget.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await http
      .put(`http://localhost:5000/api/files/${fileId}`, {
        metaTags: inputField.split(/,?\s+/),
      })
      .then((response) => {
        getNewData(); // Update parent component view
        toggle(e);
        console.log(response);
      })
      .catch((error) => console.error("Something went wrong: ", error));
  };

  return (
    <>
      <Badge
        href="#pablo"
        color="secondary"
        pill
        onClick={(e) => {
          e.preventDefault();
          toggle();
        }}
      >
        {buttonLabel}
      </Badge>
      <Modal
        className={modalClassName}
        isOpen={modal}
        unmountOnClose={unmountOnClose}
        toggle={toggle}
      >
        <div className="modal-header">
          <h5 className="modal-title" id="modal-title-default">
            Edit tags for {file.name}
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
              name="metaTags"
              id="metaTags"
              placeholder="Add tags seperated by a comma (,)"
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
                Add
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default MetaTag;
