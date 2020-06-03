import React from "react";

function TableHeader({ ...rest }) {
  return (
    <thead className="thead-light">
      <tr>
        <th scope="col" width="76">
          <div className="custom-control custom-checkbox mb-3">
            <input
              className="custom-control-input"
              id="check-all"
              type="checkbox"
              {...rest}
            />
            <label className="custom-control-label" htmlFor="check-all"></label>
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
