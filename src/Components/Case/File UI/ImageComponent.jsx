import { Box, Image } from "@chakra-ui/react";
import PropTypes from "prop-types";

const ImageComponent = ({ file }) => {
  return (
    <Box w={250} h={250} overflow={"hidden"} bg="transparent" rounded={5}>
      <a href={`http://${file}`} target="_blank" rel="noreferrer">
        <Image src={`http://${file}`} />
      </a>
    </Box>
  );
};

ImageComponent.propTypes = {
  file: PropTypes.object,
};

export default ImageComponent;
