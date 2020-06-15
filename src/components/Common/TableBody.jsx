import React, { useState, useEffect } from "react";
import { Media } from "reactstrap";
import { Link } from "react-router-dom";

function TableBody({ collection, getFiles, isSelected, onCheckboxChange }) {
  //const [folderId, setFolderId] = useState("");
  //const [checkboxes, setCheckboxes] = useState([]);
  const [allFiles, setAllFiles] = useState([]);

  useEffect(() => {
    //setFolderId(collection.rootFolder._id);
    setAllFiles(
      collection.dataCache.filter(
        (file) => file.parents[0] === collection.rootFolder._id
      )
    );
  }, [collection.dataCache, collection.files, collection.rootFolder._id]);

  handleIsSelected() {
    Object.keys(this.state.checkboxes)
      .filter(checkbox => this.state.checkboxes[checkbox])
  }

  return (
    <tbody>
      {allFiles &&
        allFiles.map((file) => (
          <tr key={file._id}>
            <th scope="row">
              <div className="custom-control custom-checkbox mb-4">
                <input
                  className="custom-control-input"
                  id={file._id}
                  type="checkbox"
                  checked={isSelected}
                  onChange={onCheckboxChange}
                />
                <label
                  className="custom-control-label"
                  htmlFor={file._id}
                ></label>
              </div>
            </th>
            <td>
              <Media className="align-items-center">
                <Link to={`/admin/folder/${file._id}`}>
                  <i className="fas fa-folder-open mr-2" />
                  <span className="mb-0 text-sm">{file.name}</span>
                </Link>
              </Media>
            </td>
            <td>{file.createDate}</td>
            <td></td>
          </tr>
        ))}
    </tbody>
  );
}

export default TableBody;
