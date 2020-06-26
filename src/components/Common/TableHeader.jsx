import React, { useState } from "react";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TableHeader({ isSelected, onSelectAll }) {
  const [toggleCheckAll, setToggleCheckAll] = useState(false);

  const selectAll = () => {
    onSelectAll(!toggleCheckAll);
    setToggleCheckAll(!toggleCheckAll);
  };

  return (
    <thead className="thead-light">
      <tr className="file-list-item">
        <th scope="col" width="76">
          {/* <div className="custom-control custom-checkbox mb-4">
            <input
              className="custom-control-input"
              id="checkAll"
              type="checkbox"
              onChange={onSelectAll}
            />
            <label className="custom-control-label" htmlFor="checkAll"></label>
          </div> */}
          <Button color="link" size="sm" onClick={selectAll}>
            <FontAwesomeIcon
              icon={toggleCheckAll ? "check-square" : ["far", "square"]}
              size="lg"
            />
          </Button>
        </th>
        <th scope="col" width="50%">
          File Name
        </th>
        <th scope="col">Date Added</th>
        <th scope="col">Size</th>
      </tr>
    </thead>
  );
}

export default TableHeader;
