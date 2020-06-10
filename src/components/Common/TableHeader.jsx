import React from "react";

function TableHeader({ isSelected, selectAll }) {
  return (
    <thead className="thead-light">
      <tr>
        <th scope="col" width="76">
          <div className="custom-control custom-checkbox mb-4">
            <input
              className="custom-control-input"
              id="checkAll"
              type="checkbox"
              checked={isSelected}
              onChange={selectAll}
            />
            <label className="custom-control-label" htmlFor="checkAll"></label>
          </div>
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
