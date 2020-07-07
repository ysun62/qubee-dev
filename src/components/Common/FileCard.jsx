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
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import fileSizeConversion from "../../utils/fileSizeConversion";
import MetaTags from "../Modals/MetaTags";

export default function FileCard({
  file,
  getFiles,
  isSelected,
  onCheckboxClick,
}) {
  const [isStarred, setIsStarred] = useState(file.isStarred);
  const [hasComment, setHasComment] = useState(file.hasComment);
  const [isTimed, setIsTimed] = useState(file.isTimed);

  const onStarClick = () => {
    setIsStarred((prevIsStarred) => !prevIsStarred);
  };

  const onCommentClick = () => {
    setHasComment((prevHasComment) => !prevHasComment);
  };

  const onClockClick = () => {
    setIsTimed((prevIsTimed) => !prevIsTimed);
  };

  return (
    <Card className="mt-3" style={{ width: "300px" }}>
      <CardHeader tag="h3" className=" px-3 py-3">
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
      <CardBody style={{ height: "250px" }}>
        {/* <CardTitle>Special Title Treatment</CardTitle>
        <CardText>
          With supporting text below as a natural lead-in to additional content.
        </CardText>
        <Button>Go somewhere</Button> */}
      </CardBody>
      <CardFooter className="text-muted px-3 pt-2" style={{ height: "120px" }}>
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
              icon={isStarred ? "star" : ["far", "star"]}
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
              icon={hasComment ? "comment" : ["far", "comment"]}
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
              icon={isTimed ? "clock" : ["far", "clock"]}
            />
          </Button>
        </div>
        <div className="pt-2">
          <h4 className="mb-0">{file.name}</h4>
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
