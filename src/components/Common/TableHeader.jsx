import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TableHeader({ isSelected, onSelectAll, handleSortFiles, collection }) {
  const [toggleCheckAll, setToggleCheckAll] = useState(false);
  const { sorting } = collection;
  const selectAll = () => {
    onSelectAll(!toggleCheckAll);
    setToggleCheckAll(!toggleCheckAll);
  };

  function renderSortDirection(attributeName) {
    if (!sorting || sorting.attribute !== attributeName) return null;
    if (sorting.direction === 'ASC') {
      return <FontAwesomeIcon icon="arrow-down" />;
    } else {
      return <FontAwesomeIcon icon="arrow-up" />;
    }
  }

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
              icon={toggleCheckAll ? 'check-square' : ['far', 'square']}
              size="lg"
            />
          </Button>
        </th>
        <th
          className="sortable"
          scope="col"
          width="50%"
          onClick={() => handleSortFiles('name')}
        >
          File Name &nbsp;{renderSortDirection('name')}
        </th>
        <th
          className="sortable"
          scope="col"
          onClick={() => handleSortFiles('createdDate')}
        >
          Date Added &nbsp;{renderSortDirection('createdDate')}
        </th>
        <th
          className="sortable"
          scope="col"
          onClick={() => handleSortFiles('size')}
        >
          Size &nbsp;{renderSortDirection('size')}
        </th>
      </tr>
    </thead>
  );
}

export default TableHeader;
