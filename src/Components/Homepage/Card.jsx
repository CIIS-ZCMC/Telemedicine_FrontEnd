import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from "@chakra-ui/react";
import React from "react";

function CardComponent({ icon, title, content }) {
  return (
    <div>
      <Card height="100%" boxShadow="lg">
        <CardHeader display="flex" alignItems="center" gap={2}>
          {icon}
          <Heading size="lg" color="#005858">
            {title}
          </Heading>
        </CardHeader>
        <CardBody>{content}</CardBody>
        {/* <CardFooter></CardFooter> */}
      </Card>
    </div>
  );
}

export default CardComponent;
