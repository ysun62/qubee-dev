import React from "react";

function Checkbox({ file, isSelected, onCheckboxChange }) {
  return (
    <div className="custom-control custom-checkbox mb-4">
      <input
        type="checkbox"
        className="custom-control-input"
        id={file._id}
        name={file.name}
        checked={isSelected}
        onChange={onCheckboxChange}
      />
      <label className="custom-control-label" htmlFor={file._id}></label>
    </div>
  );
}

export default Checkbox;
