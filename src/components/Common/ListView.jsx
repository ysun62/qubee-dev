import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { Table } from "reactstrap";

export default function ListView({
  allFiles,
  getFiles,
  isSelected,
  onCheckboxClick,
  onSelectAll,
}) {
  return (
    <div>
      <Table
        className="align-items-center table-flush"
        hover
        responsive
        size="sm"
      >
        <TableHeader isSelected={isSelected} onSelectAll={onSelectAll} />
        <TableBody
          allFiles={allFiles}
          getFiles={getFiles}
          isSelected={isSelected}
          onCheckboxClick={onCheckboxClick}
        />
      </Table>
    </div>
  );
}
