import React from "react";
import FileCard from "./FileCard";

export default function GalleryView({
  allFiles,
  getFiles,
  isSelected,
  onCheckboxClick,
}) {
  let galleryView;

  if (allFiles.length) {
    galleryView = (
      //   <div className="d-flex justify-content-start px-3 pb-5 flex-wrap">
      <div className="gallery-grid">
        {/* <Row xs="1" sm="2" md="4"> */}
        {allFiles.map((file) => {
          return (
            <FileCard
              file={file}
              getFiles={getFiles}
              isSelected={isSelected}
              onCheckboxClick={onCheckboxClick}
              key={file._id}
            />
          );
        })}
        {/* </Row> */}
      </div>
    );
  } else {
    galleryView = <div></div>;
    // galleryView = (
    //   <tbody>
    //     <tr className="file-list-item">
    //       <td colSpan="4" style={{ textAlign: "center" }}>
    //         <h3>This folder is empty</h3>
    //         Upload your files here
    //       </td>
    //     </tr>
    //   </tbody>
    // );
  }
  return galleryView;
}
