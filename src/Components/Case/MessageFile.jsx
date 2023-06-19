import { Box } from "@chakra-ui/react";
import { BsImageFill } from "react-icons/bs";
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

  return (
    <Box w={30} bg="transparent" pl={3} pr={3} rounded={5}>
      <a href={`http://${file}`} target="_blank" rel="noreferrer">
        {ext.includes("png") || ext.includes("jpg") ? (
          <BsImageFill size={20} color="gray" />
        ) : ext.includes("mp4") ? (
          <MdVideoLibrary size={20} color="gray" />
        ) : ext.includes("mp3") ? (
          <RiFolderMusicFill size={20} color="gray" />
        ) : ext.includes("docx") ? (
          <AiFillFileWord size={20} color="gray" />
        ) : ext.includes("ppt") ? (
          <AiFillFilePpt size={20} color="gray" />
        ) : ext.includes("pdf") ? (
          <AiFillFilePdf size={20} color="gray" />
        ) : ext.includes("pdf") ? (
          <AiFillFileExcel size={20} color="gray" />
        ) : ext.includes("unknown") ? null : (
          <AiFillFileUnknown size={20} color="gray" />
        )}
      </a>
    </Box>
  );
};

MessageFile.propTypes = {
  filename: PropTypes.object,
  file: PropTypes.object,
};

export default MessageFile;
