import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { Table } from "reactstrap";

function FilesBody({
  collection,
  getFiles,
  isSelected,
  onCheckboxChange,
  selectAll,
}) {
  return (
    <Table
      className="align-items-center table-flush"
      hover
      responsive
      size="sm"
    >
      <TableHeader isSelected={isSelected} selectAll={selectAll} />
      <TableBody
        collection={collection}
        getFiles={getFiles}
        isSelected={isSelected}
        onCheckboxChange={onCheckboxChange}
      />
    </Table>
  );
}

export default FilesBody;
