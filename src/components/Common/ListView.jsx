import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { Table } from "reactstrap";

export default function ListView({
  collection,
  allFiles,
  getFiles,
  isSelected,
  onCheckboxClick,
  onSelectAll,
  setFolderId,
  setFileCount,
  handleSortFiles,
  ...props
}) {
  return (
    <div>
      <Table
        className="align-items-center table-flush"
        hover
        responsive
        size="sm"
      >
        <TableHeader
          {...props}
          isSelected={isSelected}
          onSelectAll={onSelectAll}
          handleSortFiles={handleSortFiles}
          collection={collection}
        />
        <TableBody
          {...props}
          collection={collection}
          allFiles={allFiles}
          getFiles={getFiles}
          isSelected={isSelected}
          onCheckboxClick={onCheckboxClick}
          setFolderId={setFolderId}
          setFileCount={setFileCount}
        />
      </Table>
    </div>
  );
}
