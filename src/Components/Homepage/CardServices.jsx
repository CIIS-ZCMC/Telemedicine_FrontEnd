import {
  Card,
  CardBody,
  Text,
  Box,
  CardHeader,
  Heading,
  Image,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

function CardServices({ title, img, color, desc, width }) {
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
        {/* <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px" // Adjust the desired height as needed
        > */}
        <Box bgColor="#BAE8E8" padding={2} borderRadius="30px" boxShadow="xl">
          <Card
            align="center"
            bgColor="white"
            borderRadius="30px"
            height="100%"
            width={width}
          >
            <CardHeader mt={9}>
              <Heading size="sm">{title}</Heading>
            </CardHeader>
            <CardBody>
              <Text align="center" fontSize={13}>
                {desc}
              </Text>
            </CardBody>
          </Card>
        </Box>

        {/* </Box> */}
      </div>
    </div>
  );
}

CardServices.propTypes = {
  title: PropTypes.string,
  img: PropTypes.string,
  color: PropTypes.color,
};

export default CardServices;
