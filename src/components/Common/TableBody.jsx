import React, { useState, useEffect } from "react";
import { Media, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TableBody({ collection, getFiles, isSelected, onCheckboxClick }) {
  //const [folderId, setFolderId] = useState("");
  //const [checkboxes, setCheckboxes] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    //setFolderId(collection.rootFolder._id);
    setAllFiles(
      collection.dataCache.filter(
        (file) => file.parents[0] === collection.rootFolder._id
      )
    );
  }, [collection.dataCache, collection.files, collection.rootFolder._id]);

  //const handleCheckboxClick = () => setIsChecked(!isChecked);

  return (
    <tbody>
      {allFiles &&
        allFiles.map((file) => (
          <tr key={file._id} className="file-list-item">
            <th scope="row">
              {/* <div className="custom-control custom-checkbox mb-4">
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
              </div> */}
              <Button color="link" size="sm" onClick={onCheckboxClick}>
                <FontAwesomeIcon
                  icon={isSelected ? "check-square" : ["far", "square"]}
                  size="lg"
                />
              </Button>
            </th>
            <td>
              <Media className="align-items-center">
                <Link to={`/admin/folder/${file._id}`}>
                  <FontAwesomeIcon
                    icon={file.kind === "FOLDER" ? "folder-open" : "file-image"}
                    className="mr-2"
                    size="lg"
                  />
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
