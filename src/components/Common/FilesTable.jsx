import React, { useEffect } from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { Table } from "reactstrap";

function FilesTable({ files, folders, getNewData, ...rest }) {
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
        getNewData={getNewData}
        {...rest}
      />
    </Table>
  );
}

export default FilesTable;
