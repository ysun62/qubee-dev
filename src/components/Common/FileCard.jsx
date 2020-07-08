import React, { useState } from "react";
import {
  Card,
  Button,
  CardHeader,
  CardFooter,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Badge,
  UncontrolledTooltip,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import fileSizeConversion from "../../utils/fileSizeConversion";
import MetaTags from "../Modals/MetaTags";
import fileIcons from "../../utils/FileIcons";

const H4AndTooltip = ({ file }) => {
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

export default function FileCard({
  file,
  getFiles,
  isSelected,
  onCheckboxClick,
}) {
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

  const Icon = fileIcons[file.fileExtension && file.fileExtension];

  return (
    <Card className="mt-3 file-card">
      <CardHeader tag="h3" className="file-card-header px-3 py-3">
        {" "}
        <Button
          color="link"
          size="sm"
          type="button"
          onClick={() => onCheckboxClick(file)}
        >
          <FontAwesomeIcon
            icon={isSelected[file._id] ? "check-square" : ["far", "square"]}
            size="lg"
          />
        </Button>
        <Button
          className="float-right"
          color="link"
          size="sm"
          type="button"
          // onClick={() => onEllipsisClick(file)}
        >
          <FontAwesomeIcon icon="ellipsis-v" size="lg" />
        </Button>
      </CardHeader>
      <CardBody style={{ height: "250px" }} className="file-card-body">
        {file.kind === "FILE" ? (
          <Icon />
        ) : (
          <FontAwesomeIcon icon="folder-open" />
        )}
      </CardBody>
      <CardFooter
        className="file-card-footer text-muted px-3 pt-2"
        style={{ height: "120px" }}
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
            />
          </Button>
        </div>
        <div className="pt-2">
          <H4AndTooltip file={file} />
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
              />
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
