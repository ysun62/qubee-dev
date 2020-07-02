import React from "react";
import {
  Card,
  Button,
  CardHeader,
  CardFooter,
  CardBody,
  CardTitle,
  CardText,
  Container,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function GalleryView({ allFiles, isSelected, onCheckboxClick }) {
  let galleryView;

  if (allFiles.length) {
    galleryView = (
      <Container>
        {allFiles.map((file) => (
          <Card key={file._id}>
            <CardHeader tag="h3">
              {" "}
              <Button
                color="link"
                size="sm"
                type="button"
                onClick={() => onCheckboxClick(file)}
              >
                <FontAwesomeIcon
                  icon={
                    isSelected[file._id] ? "check-square" : ["far", "square"]
                  }
                  size="lg"
                />
              </Button>
              <FontAwesomeIcon
                icon="ellipsis-v"
                size="lg"
                className="float-right"
              />
            </CardHeader>
            <CardBody>
              <CardTitle>Special Title Treatment</CardTitle>
              <CardText>
                With supporting text below as a natural lead-in to additional
                content.
              </CardText>
              <Button>Go somewhere</Button>
            </CardBody>
            <CardFooter className="text-muted">Footer</CardFooter>
          </Card>
        ))}
      </Container>
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
