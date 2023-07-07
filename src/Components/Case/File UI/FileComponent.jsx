import { Box } from "@chakra-ui/react";
import {
  AiFillFileWord,
  AiFillFilePpt,
  AiFillFilePdf,
  AiFillFileExcel,
  AiFillFileUnknown,
} from "react-icons/ai";
import PropTypes from "prop-types";

const IconComponent = (extension) => {
  const size = 20;
  const color = "gray";
  const style = { size, color };

  switch (extension) {
    case "docx":
      return <AiFillFileWord {...style} />;
    case "ppt":
      return <AiFillFilePpt {...style} />;
    case "pdf":
      return <AiFillFilePdf {...style} />;
    case "xlsx":
      return <AiFillFileExcel {...style} />;
  }

  return <AiFillFileUnknown {...style} />;
};

const FileComponent = ({ extension, file }) => {
  return (
    <Box w={40} bg="transparent" pl={3} pr={3} rounded={5}>
      <a href={`http://${file}`} target="_blank" rel="noreferrer">
        <IconComponent extension={extension} />
      </a>
    </Box>
  );
};

FileComponent.propTypes = {
  extension: PropTypes.string,
  file: PropTypes.object,
};

export default FileComponent;
