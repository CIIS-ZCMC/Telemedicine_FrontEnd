import { Box } from "@chakra-ui/react";
import { MdVideoLibrary } from "react-icons/md";
import PropTypes from "prop-types";

const VideoComponent = ({ file }) => {
  return (
    <Box w={250} bg="transparent" pl={3} pr={3} rounded={5}>
      <a href={`http://${file}`} target="_blank" rel="noreferrer">
        <MdVideoLibrary size={20} color="gray" />
      </a>
    </Box>
  );
};

VideoComponent.propTypes = {
  file: PropTypes.object,
};

export default VideoComponent;
