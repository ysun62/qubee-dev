import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { Table } from "reactstrap";

function FilesBody({ collection, getFiles, isChecked, ...rest }) {
  return (
    <Table
      className="align-items-center table-flush"
      hover
      responsive
      size="sm"
    >
      <TableHeader {...rest} />
      <TableBody
        collection={collection}
        getFiles={getFiles}
        isChecked={isChecked}
      />
    </Table>
  );
}

export default FilesBody;
