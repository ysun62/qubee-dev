import React from 'react';
import { Button } from 'reactstrap';
import { getDownloadFileUrl } from '../../services/fileService';
import { openInNewTab } from '../../utils/browser';

const DownloadFiles = ({ selectedData, buttonLabel, buttonIcon }) => {
  function handleDownload() {
    const url = getDownloadFileUrl(selectedData);
    openInNewTab(url);
  }

  return (
    <Button color="link" onClick={handleDownload}>
      {buttonIcon}
      <span className="btn-inner--text d-md-inline d-none">{buttonLabel}</span>
    </Button>
  );
};
export default DownloadFiles;
