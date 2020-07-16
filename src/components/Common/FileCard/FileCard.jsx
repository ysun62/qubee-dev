import React from "react";
import { Card } from "reactstrap";

import FileCardHeader from "./FileCardHeader";
import FileCardBody from "./FileCardBody";
import FileCardFooter from "./FileCardFooter";

export default function FileCard({
  file,
  getFiles,
  isSelected,
  onCheckboxClick,
}) {
  const isFile = file.kind === "FILE";

  return (
    <Card className="mt-3 file-card">
      <FileCardHeader
        file={file}
        isSelected={isSelected}
        onCheckboxClick={onCheckboxClick}
      />
      <FileCardBody file={file} isSelected={isSelected} isFile={isFile} />
      <FileCardFooter
        file={file}
        isSelected={isSelected}
        getFiles={getFiles}
        isFile={isFile}
      />
    </Card>
  );
}
