import React from 'react';
import { Button } from 'reactstrap';
import { downloadFiles } from '../../services/fileService';

const DownloadFiles = ({ selectedData, buttonLabel, buttonIcon }) => {
  function handleDownload() {
    downloadFiles(selectedData);
  }

  return (
    <Button color="link" onClick={handleDownload}>
      {buttonIcon}
      <span className="btn-inner--text d-md-inline d-none">{buttonLabel}</span>
    </Button>
  );
};
export default DownloadFiles;
