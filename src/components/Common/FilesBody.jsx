import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { Table } from "reactstrap";

function FilesTable({ files, folders, getFiles, isChecked, ...rest }) {
  return (
    <Table
      className="align-items-center table-flush"
      hover
      responsive
      size="sm"
    >
      <TableHeader {...rest} />
      <TableBody
        files={files}
        folders={folders}
        getFiles={getFiles}
        isChecked={isChecked}
      />
    </Table>
  );
}

export default FilesTable;
