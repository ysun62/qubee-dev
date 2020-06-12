import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

class UploadFolderPicker extends Component {
  handleClick = (folder) => {
    this.props.handleFolderSelection(folder);
  };
  render() {
    return (
      <>
        <h3>All</h3>
        <ListGroup flush>
          {this.props.folders.map((folder) => (
            <ListGroupItem
              key={folder._id}
              tag="button"
              action
              onClick={() => this.handleClick(folder._id)}
            >
              <i className="fas fa-folder-open mr-2" />
              <span className="mb-0 text-sm">{folder.name}</span>
            </ListGroupItem>
          ))}
        </ListGroup>
      </>
    );
  }
}

export default UploadFolderPicker;
