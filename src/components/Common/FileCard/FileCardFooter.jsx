import React, { useState } from "react";
import { Button, CardFooter, Badge, UncontrolledTooltip } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import fileSizeConversion from "../../../utils/fileSizeConversion";
import MetaTags from "../../Modals/MetaTags";

// Shortens the file name and adds a tooltip for long file names. Then returns the file name.
const FileNameAndTooltip = ({ file }) => {
  const fileNameLen = file.name.length;

  const shortenedFileName =
    fileNameLen > 30 &&
    file.name.substring(0, 10) +
      "..." +
      file.name.substring(fileNameLen - 10, fileNameLen);

  const fileName = fileNameLen > 30 ? shortenedFileName : file.name;

  return (
    <>
      <h4
        className="mb-0 d-inline"
        id={fileNameLen > 30 ? `tooltip${file._id}` : ""}
      >
        {fileName}
      </h4>
      {fileNameLen > 30 && (
        <UncontrolledTooltip
          placement="top"
          target={`tooltip${file._id}`}
          autohide={false}
        >
          {file.name}
        </UncontrolledTooltip>
      )}
    </>
  );
};

export default function FileCardFooter({ file, isSelected, getFiles }) {
  const [isFavorite, setIsFavorite] = useState(file.isFavorite);
  const [hasComments, setHasComments] = useState(file.hasComments);
  const [isScheduled, setIsScheduled] = useState(file.isScheduled);

  const onStarClick = () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
  };

  const onCommentClick = () => {
    setHasComments((prevHasComments) => !prevHasComments);
  };

  const onClockClick = () => {
    setIsScheduled((prevIsScheduled) => !prevIsScheduled);
  };

  return (
    <CardFooter
      className="file-card-footer text-muted px-3 pt-2"
      style={{
        height: "120px",
        backgroundColor: isSelected[file._id] && "#f7fafc",
      }}
    >
      <div>
        <Button
          className="p-0 mr-2"
          color="link"
          size="lg"
          type="button"
          onClick={() => onStarClick()}
        >
          <FontAwesomeIcon
            size="lg"
            icon={isFavorite ? "star" : ["far", "star"]}
            color={isFavorite ? "#ffd600" : ""}
          />
        </Button>
        <Button
          className="p-0"
          color="link"
          size="lg"
          type="button"
          onClick={() => onCommentClick()}
        >
          <FontAwesomeIcon
            size="lg"
            icon={hasComments ? "comment" : ["far", "comment"]}
            color={isScheduled ? "#5e72e4" : ""}
          />
        </Button>
        <Button
          className="p-0 float-right"
          color="link"
          size="lg"
          type="button"
          onClick={() => onClockClick()}
        >
          <FontAwesomeIcon
            size="lg"
            icon={isScheduled ? "clock" : ["far", "clock"]}
            color={isScheduled ? "#f5365c" : ""}
          />
        </Button>
      </div>
      <div className="pt-2">
        <FileNameAndTooltip file={file} />
        {file.size && (
          <p
            style={{ marginTop: "-0.4rem", fontSize: "0.85rem" }}
            className="mb-0"
          >
            <small>
              {file.kind === "FILE" && fileSizeConversion(file.size, false)}
            </small>
          </p>
        )}
        {file.metaTags && (
          <div className="tags-container mt-1">
            {file.metaTags.map((tag, i) => (
              <Badge
                key={tag + i}
                className="badge-default mr-2"
                href="#pablo"
                pill
              >
                {tag}
              </Badge>
            ))}
            <MetaTags
              buttonLabel="add +"
              fileId={file._id}
              getFiles={getFiles}
              file={file}
            />
          </div>
        )}
      </div>
    </CardFooter>
  );
}
