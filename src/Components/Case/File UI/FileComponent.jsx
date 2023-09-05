import { Box, Flex, Text } from "@chakra-ui/react";
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

const splitFilePath = (file) => {
  const arraySplit = file.split("/");

  return arraySplit[arraySplit.length - 1];
};

const FileComponent = ({ extension, file }) => {
  const fileName = splitFilePath(file);

  return (
    <Box w="8rem" h="40px" rounded={30} bg="rgba(0,0,0,0.2)" p={2}>
      <Flex justifyContent="space-around">
        <Box w={40} bg="transparent" pl={3} pr={3} rounded={5}>
          <a href={`http://${file}`} target="_blank" rel="noreferrer">
            <IconComponent extension={extension} />
          </a>
        </Box>
        <Box mr={5}>
          <Text fontSize={13} fontWeight="500" color="gray.700">
            {fileName + ".txt"}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

FileComponent.propTypes = {
  extension: PropTypes.string,
  file: PropTypes.string,
};

export default FileComponent;
