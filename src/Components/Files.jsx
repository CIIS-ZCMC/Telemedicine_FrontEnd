import { Box, Flex } from "@chakra-ui/react";
import { IoCloseSharp } from "react-icons/io5";
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
import "../Style/Consult.css";
import PropTypes from "prop-types";

const Files = ({ selectedFiles }) => {
  const handleRemoveFile = (e, index) => {
    e.preventDefault();
    selectedFiles.splice(index, 1);
  };

  return (
    <Box h={"2rem"} bg="transparent" display="flex" columnGap={3}>
      {Array.prototype.slice.call(selectedFiles).map((e, index) => {
        let ext = e.name.split(".")[1];
        return (
          <Box
            key={index}
            w="3.5rem"
            bg={"blackAlpha.200"}
            p={0.5}
            fontSize={13}
            color={"blue.900"}
            textAlign={"center"}
            borderRadius={"5"}
            cursor={"pointer"}
            border={"1px solid"}
            borderColor={"gray.400"}
            className={"attacheditems"}
          >
            <Flex columnGap={2}>
              {ext.toLowerCase().includes("png") ||
              ext.toLowerCase().includes("jpg") ? (
                <BsImageFill size={25} color="gray" />
              ) : ext.toLowerCase().includes("mp4") ? (
                <MdVideoLibrary size={20} color="gray" />
              ) : ext.toLowerCase().includes("mp3") ? (
                <RiFolderMusicFill size={20} color="gray" />
              ) : ext.toLowerCase().includes("docx") ? (
                <AiFillFileWord size={20} color="gray" />
              ) : ext.toLowerCase().includes("ppt") ? (
                <AiFillFilePpt size={20} color="gray" />
              ) : ext.toLowerCase().includes("pdf") ? (
                <AiFillFilePdf size={20} color="gray" />
              ) : ext.toLowerCase().includes("pdf") ? (
                <AiFillFileExcel size={20} color="gray" />
              ) : (
                <AiFillFileUnknown size={25} color="gray" />
              )}
              <Box onClick={(e) => handleRemoveFile(e, index)}>
                <IoCloseSharp fontSize={15} />
              </Box>
            </Flex>
          </Box>
        );
      })}
    </Box>
  );
};

Files.propTypes = {
  selectedFiles: PropTypes.files,
};

export default Files;
