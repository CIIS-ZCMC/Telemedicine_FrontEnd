import { Box } from "@chakra-ui/react";
import { RiFolderMusicFill } from "react-icons/ri";
import PropTypes from "prop-types";

const MP3Component = ({ file }) => {
  return (
    <Box w={250} bg="transparent" pl={3} pr={3} rounded={5}>
      <a href={`http://${file}`} target="_blank" rel="noreferrer">
        <RiFolderMusicFill size={20} color="gray" />
      </a>
    </Box>
  );
};

MP3Component.propTypes = {
  file: PropTypes.object,
};

export default MP3Component;
