import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { Table } from "reactstrap";

function FilesBody({
  collection,
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
        getFiles={getFiles}
        isSelected={isSelected}
        onCheckboxClick={onCheckboxClick}
        setFolderId={setFolderId}
        setFileCount={setFileCount}
      />
    </Table>
  );
}

export default FilesBody;
