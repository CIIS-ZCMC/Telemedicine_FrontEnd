import { Search2Icon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  Text,
  Box,
  IconButton,
  CardHeader,
  Heading,
  Image,
} from "@chakra-ui/react";
import React from "react";
import im from "../../assets/Icons/im.png";

function CardServices({ title, img, color }) {
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          height: 100,
          zIndex: 40,
          left: 0,

          right: 0,
          display: "flex",
          justifyContent: "center",
          top: -40,
        }}
      >
        <Box
          width={70}
          height={70}
          borderRadius="full"
          bgColor={color}
          align="center"
          p={4}
        >
          <Image src={img} />
        </Box>
      </div>
      <div>
        <Card align="center" height="100%" boxShadow="lg" borderRadius="30px">
          <CardHeader mt={9}>
            <Heading size="sm">{title}</Heading>
          </CardHeader>
          <CardBody>
            <Text align="center" fontSize={14}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </Text>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default CardServices;
