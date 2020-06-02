import React, { useState, useEffect } from "react";
import http from "../../services/httpService";
import config from "../../config";
import { toast } from "react-toastify";
import { Button, Modal, Form, Input, Badge, Label } from "reactstrap";

const MetaTag = (props) => {
  const { buttonLabel, modalClassName, fileId, getNewData } = props;
  const [modal, setModal] = useState(false);
  const [originalValue, setOriginalValue] = useState("");
  const [inputField, setInputField] = useState(null);
  const [fileName, setFileName] = useState({});

  useEffect(() => {
    async function getFileById() {
      const { data } = await http.get(config.filesEndpoint + "/" + fileId);
      setFileName(data.name);

      // Break the array of tags into a list
      const metaTags = data.metaTags.join("\n");
      setOriginalValue(metaTags);
      setInputField(metaTags);
    }
    getFileById();
  }, [fileId]);

  const toggle = () => setModal(!modal);

  const handleOnChange = (e) => {
    setInputField(e.currentTarget.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tagArray = inputField.replace(/[^0-9a-zA-Z-_ \n]/g, "").split(/\s+/);

    // If duplicate meta tags, prevent saving.
    if (checkDuplicate(tagArray))
      return toast.error("There are duplicate tags.");

    const tags = {
      metaTags: inputField ? tagArray : [],
    };

    await http
      .put(config.filesEndpoint + "/" + fileId, tags)
      .then((response) => {
        getNewData(); // Update parent component view
        toggle(e);
        //console.log(response.data);
      })
      .catch((error) => console.error("Something went wrong: ", error));
  };

  // Check for duplicate meta tags
  const checkDuplicate = (array) => {
    // compare the size of array and Set
    if (array.length !== new Set(array).size) return true;

    return false;
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
      <Modal className={modalClassName} isOpen={modal} toggle={toggle}>
        <div className="modal-header">
          <h5 className="modal-title" id="modal-title-default">
            Edit tags for {fileName}
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
            <Label for="metaTags">
              Add or remove your tags. (one tag per line)
            </Label>
            <Input
              name="metaTags"
              id="metaTags"
              placeholder="Add one tag per line."
              rows="5"
              type="textarea"
              value={inputField}
              onChange={handleOnChange}
            />
          </div>
          <div className="modal-footer">
            <div className="text-center">
              <Button data-dismiss="modal" color="link" onClick={toggle}>
                Cancel
              </Button>
              <Button color="primary" type="submit">
                {inputField ? "Update" : "Add"}
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default MetaTag;
