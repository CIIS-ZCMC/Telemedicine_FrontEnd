import { Box, Image } from "@chakra-ui/react";
import { MdVideoLibrary } from "react-icons/md";
import { RiFolderMusicFill } from "react-icons/ri";
import {
  AiFillFileWord,
  AiFillFilePpt,
  AiFillFilePdf,
  AiFillFileExcel,
  AiFillFileUnknown,
} from "react-icons/ai";
import PropTypes from "prop-types";

const MessageFile = ({ filename, file }) => {
  let ext = filename.split(".")[1] ?? "unknown";

  if (ext.includes("png") || ext.includes("jpg")) {
    return (
      <Box w={250} bg="transparent" pl={3} pr={3} rounded={5}>
        <a href={`http://${file}`} target="_blank" rel="noreferrer">
          <Image src={`http://${file}`} />
        </a>
      </Box>
    );
  }

  if (ext.includes("mp4")) {
    return (
      <Box w={250} bg="transparent" pl={3} pr={3} rounded={5}>
        <a href={`http://${file}`} target="_blank" rel="noreferrer">
          <MdVideoLibrary size={20} color="gray" />
        </a>
      </Box>
    );
  }

  if (ext.includes("mp3")) {
    return (
      <Box w={250} bg="transparent" pl={3} pr={3} rounded={5}>
        <a href={`http://${file}`} target="_blank" rel="noreferrer">
          <RiFolderMusicFill size={20} color="gray" />
        </a>
      </Box>
    );
  }

  if (ext.includes("docx")) {
    return (
      <Box w={40} bg="transparent" pl={3} pr={3} rounded={5}>
        <a href={`http://${file}`} target="_blank" rel="noreferrer">
          <AiFillFileWord size={20} color="gray" />
        </a>
      </Box>
    );
  }

  if (ext.includes("ppt")) {
    return (
      <Box w={40} bg="transparent" pl={3} pr={3} rounded={5}>
        <a href={`http://${file}`} target="_blank" rel="noreferrer">
          <AiFillFilePpt size={20} color="gray" />
        </a>
      </Box>
    );
  }

  if (ext.includes("pdf")) {
    return (
      <Box w={40} bg="transparent" pl={3} pr={3} rounded={5}>
        <a href={`http://${file}`} target="_blank" rel="noreferrer">
          <AiFillFilePdf size={20} color="gray" />
        </a>
      </Box>
    );
  }

  if (ext.includes("xlsx")) {
    return (
      <Box w={40} bg="transparent" pl={3} pr={3} rounded={5}>
        <a href={`http://${file}`} target="_blank" rel="noreferrer">
          <AiFillFileExcel size={20} color="gray" />
        </a>
      </Box>
    );
  }

  return (
    <Box w={40} bg="transparent" pl={3} pr={3} rounded={5}>
      <a href={`http://${file}`} target="_blank" rel="noreferrer">
        <AiFillFileUnknown size={20} color="gray" />
      </a>
    </Box>
  );
};

MessageFile.propTypes = {
  filename: PropTypes.object,
  file: PropTypes.object,
};

export default MessageFile;
