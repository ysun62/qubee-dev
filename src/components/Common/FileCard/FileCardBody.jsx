import React from "react";
import { Link } from "react-router-dom";
import { CardBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import fileIcons from "../../../utils/fileIcons";
import { ReactComponent as Unknown } from "../../../utils/SVGs/unknown.svg";
import { ReactComponent as PlayButton } from "../../../utils/SVGs/play-button.svg";

// Returns an Icon for the file
const Icon = ({ file }) => {
  const fileIcon = fileIcons[file.fileExtension && file.fileExtension];

  // If video file, display the PlayButton
  if (file.isVideo) return <PlayButton />;
  // If not video file, display the fileIcon; if the fileIcon is not found, display the Unknown
  else
    return fileIcon ? (
      <div dangerouslySetInnerHTML={{ __html: fileIcon }} />
    ) : (
      <Unknown />
    );
};

export default function FileCardBody({ file, isSelected, isFile }) {
  const isVideoOrImage = file.isVideo || file.isImage;

  const cardbody = (
    <CardBody
      style={{
        backgroundColor: isSelected[file._id] && "#f7fafc",

        // If it's a video file, set backgroundImage accordingly
        backgroundImage: isVideoOrImage
          ? `url(
             "/uploads/${file.slug.substring(
               0,
               file.slug.lastIndexOf(".")
             )}_thumbnail.jpg")`
          : "",

        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
      className="file-card-body"
    >
      {/* If file kind is "FILE" and it's not an image, display the icons; else display the folder icon */}
      {isFile ? (
        !file.isImage && <Icon file={file} />
      ) : (
        <FontAwesomeIcon icon="folder-open" />
      )}
    </CardBody>
  );

  return (
    <>
      {isFile ? (
        cardbody
      ) : (
        <Link to={`/admin/folder/${file._id}`}>{cardbody}</Link>
      )}
    </>
  );
}
