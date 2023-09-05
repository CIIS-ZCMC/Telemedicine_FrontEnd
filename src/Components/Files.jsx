import { useState, useEffect } from "react";
import { Box, IconButton, Image } from "@chakra-ui/react";
import { IoCloseSharp } from "react-icons/io5";
import {  RiCloseCircleFill } from "react-icons/ri";

import "../Style/Consult.css";
import PropTypes from "prop-types";

const ImageComponent = ({ event, index, handleRemoveFile }) => {
  return (
    <Box w={70} h={70} rounded={10} position="relative">
      <Box w={70} h={70} overflow="hidden" rounded={10} position="absolute">
        <Image
          src={URL.createObjectURL(e)}
          name={event.name}
          position="absolute"
        />
      </Box>
      <IconButton
        size="sm"
        icon={<RiCloseCircleFill size={32} color="white" />}
        backgroundColor="rgba(0,0,0,0.07)"
        rounded={50}
        float="right"
        mt="-2"
        mr="-2"
        onClick={(e) => handleRemoveFile(e, index)}
      />
    </Box>
  );
};

const buildComponent = (e, index, handleRemoveFile) => {
  let extension = e.name.split(".")[1];
  switch (extension) {
    case "png" || "jpg":
      return (
        <ImageComponent
          key={index}
          event={e}
          index={index}
          handleRemoveFile={handleRemoveFile}
        />
      );
    default:
      return <IoCloseSharp key={index} fontSize={15} />;
  }
};

ImageComponent.propTypes = {
  event: PropTypes.object,
  index: PropTypes.integer,
  handleRemoveFile: PropTypes.function,
};

const Files = ({ selectedFiles, setSelectedFiles }) => {
  const [fileUI, setFileUi] = useState([]);
  const [height, setHeight] = useState(5);

  const handleRemoveFile = (e, index) => {
    e.preventDefault();
    setSelectedFiles((prevData) => prevData.filter((_, i) => i !== index));
  };

  useEffect(() => {
    setFileUi(
      Array.prototype.slice
        .call(selectedFiles)
        .map((e, index) => buildComponent(e, index, handleRemoveFile))
    );
    console.log("test");
  }, [selectedFiles]);

  return (
    <Box
      h={selectedFiles.length === 0 ? 0 : `${height}rem`}
      display="flex"
      columnGap={3}
      ml={5}
    >
      {fileUI.map((file) => file)}
    </Box>
  );
};

Files.propTypes = {
  selectedFiles: PropTypes.files,
  setSelectedFiles: PropTypes.function,
};

export default Files;

{
  /* <Box
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
    <Image key={index} src={URL.createObjectURL(e)} />
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
</Box> */
}
