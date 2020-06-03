import React, { Component } from "react";
import Tags from "./Tags";
import fileSizeConversion from "../../utils/fileSizeConversion";
import { Media, Button } from "reactstrap";
import { Link } from "react-router-dom";

class TableBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkboxes: new Map(),
    };
  }

  checkAll = () => {
    this.state.data.forEach((item) => {
      item.checked = true;
      item.items.forEach((child) => (child.checked = true));
    });
    this.forceUpdate();
  };

  uncheckAll = () => {
    this.state.data.forEach((item) => {
      item.checked = false;
      item.items.forEach((child) => (child.checked = false));
    });
    this.forceUpdate();
  };

  //   handleChange = (event) => {
  //     //event.item.checked = !event.item.checked;
  //     console.log(event.target.checked);
  //     this.forceUpdate();
  //   };

  handleChange = (e) => {
    const item = e.target.id;
    const isChecked = e.target.checked;
    this.setState((prevState) => ({
      checkboxes: prevState.checkboxes.set(item, isChecked),
    }));
  };

  clearAllCheckboxes = () => {
    const clearCheckedItems = new Map();
    this.setState({ checkboxes: clearCheckedItems });
  };

  checkAllCheckboxes = () => {};

  render() {
    const { files, folders, getNewData, ...rest } = this.props;
    console.log(this.state.checkboxes);

    return (
      <tbody>
        {folders.map((folder) => (
          <tr
            key={folder._id}
            className={this.state.isSelected ? "selected" : ""}
          >
            <th scope="row">
              <div className="custom-control custom-checkbox mb-4">
                <input
                  className="custom-control-input"
                  id={folder._id}
                  value={folder._id}
                  type="checkbox"
                  checked={!!this.state.checkboxes.get(folder._id)}
                  onChange={this.handleChange}
                />
                <label
                  className="custom-control-label"
                  htmlFor={folder._id}
                ></label>
              </div>
            </th>
            <td>
              <Media className="align-items-center">
                <Link to={`/admin/folder/${folder.path}`}>
                  <i className="fas fa-folder-open mr-2" />
                  <span className="mb-0 text-sm">{folder.name}</span>
                </Link>
              </Media>
            </td>
            <td>{folder.dateAdded}</td>
            <td></td>
          </tr>
        ))}
        {files.map((file, i) => (
          <tr
            key={file._id}
            className={this.state.isSelected ? "selected" : ""}
          >
            <th scope="row">
              <div className="custom-control custom-checkbox mb-4">
                <input
                  className="custom-control-input"
                  id={file._id}
                  value={file._id}
                  type="checkbox"
                  checked={!!this.state.checkboxes.get(file._id)}
                  onChange={this.handleChange}
                />
                <label
                  className="custom-control-label"
                  htmlFor={file._id}
                ></label>
              </div>
            </th>
            <td>
              <Media className="align-items-center mb-2">
                <a href={file.path} target="blank">
                  <i className="fas fa-file-image mr-2" />
                  <span className="mb-0 text-sm">{file.name}</span>
                </a>
              </Media>
              <Tags file={file} getNewData={getNewData} />
            </td>
            <td>{file.dateAdded}</td>
            <td>{fileSizeConversion(file.size, true)}</td>
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
