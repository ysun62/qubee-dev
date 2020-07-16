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
  return (
    <Card className="mt-3 file-card">
      <FileCardHeader
        file={file}
        isSelected={isSelected}
        onCheckboxClick={onCheckboxClick}
      />
      <FileCardBody file={file} isSelected={isSelected} />
      <FileCardFooter file={file} isSelected={isSelected} getFiles={getFiles} />
    </Card>
  );
}
