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
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FileCard({ file, isSelected, onCheckboxClick }) {
  const [isStarred, setIsStarred] = useState(false);
  const [hasComment, setHasComment] = useState(false);
  const [isTimed, setIsTimed] = useState(false);

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
          // onClick={() => onCheckboxClick(file)}
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
            // onClick={() => onCheckboxClick(file)}
          >
            <FontAwesomeIcon
              size="lg"
              icon={isStarred ? "star" : ["far", "star"]}
              // onClick={() => onStarClick(file)}
            />
          </Button>
          <Button
            className="p-0"
            color="link"
            size="lg"
            type="button"
            // onClick={() => onCheckboxClick(file)}
          >
            <FontAwesomeIcon
              size="lg"
              icon={hasComment ? "comment-dots" : "comment"}
              // onClick={() => onCommentClick(file)}
            />
          </Button>
          <Button
            className="p-0 float-right"
            color="link"
            size="lg"
            type="button"
            // onClick={() => onCheckboxClick(file)}
          >
            <FontAwesomeIcon
              size="lg"
              icon={isTimed ? "clock" : ["far", "clock"]}
              // onClick={() => onClockClick(file)}
            />
          </Button>
        </div>
        <div className="pt-2">
          <h4 className="mb-0">{file.name}</h4>
          {file.size && (
            <p style={{ marginTop: "-0.4rem", fontSize: "0.85rem" }}>
              <small>{file.size}</small>
            </p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
