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
          width={75}
          height={75}
          borderRadius="full"
          bgColor={color}
          align="center"
          p={4}
          boxShadow="xl"
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

        <Card
          align="center"
          bgColor="#32bbbb"
          borderRadius="15px"
          height="100%"
          width={width}
          color="white"
          boxShadow="xl"
        >
          <CardHeader mt={9}>
            <Heading size="sm">{title}</Heading>
          </CardHeader>
          <CardBody>
            <Text textAlign="center" fontSize={13}>
              {desc}
            </Text>
          </CardBody>
        </Card>

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
