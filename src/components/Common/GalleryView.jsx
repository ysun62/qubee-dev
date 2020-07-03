import React from "react";
import FileCard from "./FileCard";

const gridStyles = {
  display: "grid",
  gridGap: "0.25rem",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  padding: "0 1rem 3rem",
};

export default function GalleryView({ allFiles, isSelected, onCheckboxClick }) {
  //   const onStarClick = (file) => {
  //     console.log(file);
  //     setIsStarred(!isStarred);
  //   };

  //   const onCommentClick = (file) => {
  //     setHasComment(!hasComment);
  //   };

  //   const onClockClick = (file) => {
  //     setIsTimed(!isTimed);
  //   };

  let galleryView;

  if (allFiles.length) {
    galleryView = (
      //   <div className="d-flex justify-content-start px-3 pb-5 flex-wrap">
      <div style={gridStyles}>
        {/* <Row xs="1" sm="2" md="4"> */}
        {allFiles.map((file) => (
          <FileCard
            file={file}
            isSelected={isSelected}
            onCheckboxClick={onCheckboxClick}
            key={file._id}
          />
        ))}
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
