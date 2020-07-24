import React from "react";
import { Link } from "react-router-dom";
import { CardBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import fileIcons from "../../../assets/img/icons/fileIcons";
import { ReactComponent as IconAudio } from "../../../assets/img/icons/files/qubee_icon_audio_cool.svg";
import { ReactComponent as IconDoc } from "../../../assets/img/icons/files/qubee_icon_doc_cool.svg";
import { ReactComponent as IconZip } from "../../../assets/img/icons/files/qubee_icon_zip_cool.svg";
import { ReactComponent as IconFont } from "../../../assets/img/icons/files/qubee_icon_font_cool.svg";
import { ReactComponent as IconUnknown } from "../../../assets/img/icons/files/qubee_icon_error.svg";
import { ReactComponent as IconPlayButton } from "../../../assets/img/icons/files/play-button.svg";

// Returns an Icon for the file
const Icon = ({ file }) => {
  const { fileType, fileExtension } = file;
  const fileIcon = fileIcons[fileExtension && fileExtension];

  switch (fileType) {
    case "video":
      return <IconPlayButton />;

    case "audio":
      return <IconAudio />;

    case "compress":
      return <IconZip />;

    case "font":
      return <IconFont />;

    case "image":
      return (
        fileExtension === "svg" && (
          <div dangerouslySetInnerHTML={{ __html: fileIcon }} />
        )
      );

    case "document":
      if (fileIcon) {
        return <div dangerouslySetInnerHTML={{ __html: fileIcon }} />;
      } else {
        // Sometimes the mimetype of a font file is in the "document" category, so we need to do the following check
        const isFontFile =
          fileExtension === "otf" ||
          fileExtension === "ttf" ||
          fileExtension === "woff" ||
          fileExtension === "woff2";
        return isFontFile ? <IconFont /> : <IconDoc />;
      }

    // Note: it actually will never return IconUnknown
    default:
      return <IconUnknown />;
  }
};

export default function FileCardBody({ file, isSelected, isFile }) {
  const { fileType, _id, slug, fileExtension } = file;
  const isVideoOrImage =
    fileType === "video" || (fileType === "image" && fileExtension !== "svg");
  const notSvgImage = fileType !== "image" || fileExtension === "svg";

  const cardbody = (
    <CardBody
      style={{
        backgroundColor: isSelected[_id] && "#f7fafc",

        // If it's a video or image file, set backgroundImage accordingly
        backgroundImage: isVideoOrImage
          ? `url(
             "/uploads/${slug.substring(
               0,
               slug.lastIndexOf(".")
             )}_thumbnail.jpg")`
          : "",

        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
      className="file-card-body"
    >
      {/* If file kind is "FILE" and file is not an image, display the icons; else display the folder icon */}
      {isFile ? (
        notSvgImage && <Icon file={file} />
      ) : (
        <FontAwesomeIcon icon="folder-open" />
      )}
    </CardBody>
  );

  return (
    <>
      {isFile ? cardbody : <Link to={`/admin/folder/${_id}`}>{cardbody}</Link>}
    </>
  );
}
