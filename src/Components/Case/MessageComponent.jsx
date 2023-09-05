import React from "react";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import moment from "moment/moment";
import MessageFile from "./MessageFile";
import PropTypes from "prop-types";

const FileList = (prop) => {
  if (prop.files !== null) {
    let files = prop.files.split(",");

    if (files.length > 1) {
      return (
        <Box ml={"5rem"} float={prop.PK_hospital_ID === 1 ? "right" : "left"}>
          <Box ml={"5rem"}>
            <Flex
              flexWrap="wrap"
              flexDir={prop.PK_hospital_ID === 1 ? "row-reverse" : "row"}
              columnGap={3}
            >
              {files.map((file, index) => {
                let desctuctureFileURL = file.split("/");
                return (
                  <MessageFile
                    key={index}
                    file={file}
                    filename={
                      file === null
                        ? "File Missing."
                        : desctuctureFileURL[desctuctureFileURL.length - 1]
                    }
                  />
                );
              })}
            </Flex>
          </Box>
        </Box>
      );
    }

    if (!Array.isArray(prop.files)) {
      let desctuctureFileURL = prop.files.split("/");

      return (
        <Box ml={"5rem"} float={prop.PK_hospital_ID === 1 ? "right" : "left"}>
          <Box mr={"5.6rem"}>
            <Flex
              flexWrap="wrap"
              flexDir={prop.PK_hospital_ID === 1 ? "row-reverse" : "row"}
              columnGap={3}
            >
              <MessageFile
                file={prop.files}
                filename={desctuctureFileURL[desctuctureFileURL.length - 1]}
              />
            </Flex>
          </Box>
        </Box>
      );
    }
  }

  return null;
};
const MessageComponent = ({
  PK_hospital_ID,
  profile,
  name,
  hospital_Name,
  comment,
  created_at,
  fileNames,
}) => {
  const data = decodeURIComponent(comment);
  const message = data.replace(/%0A/g, "\n");

  const messageWithLineBreaks = message.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br /> {/* Add a line break */}
    </React.Fragment>
  ));

  return (
    <Box
      w="100%"
      display="flex"
      flexDirection="column"
      float={PK_hospital_ID === 1 ? "right" : "left"}
    >
      {fileNames === null ? null : (
        <FileList files={fileNames} PK_hospital_ID={PK_hospital_ID} />
      )}
      <Box
        display="flex"
        flexDirection={PK_hospital_ID === 1 ? "row-reverse" : "row"}
        alignItems="center"
        pl={5}
        pr={10}
        pb={10}
        columnGap={5}
        mb={5}
      >
        <Avatar src={profile} name={name} size="sm" />
        <Box>
          <Box mt={2}>
            <Box dir={PK_hospital_ID === 1 ? "rtl" : "none"}>
              <Text
                w={"auto"}
                bg="white"
                p={3}
                rounded={10}
                boxShadow="md"
                dir="ltr"
              >
                {messageWithLineBreaks}
              </Text>
              <Text fontSize={12}>
                {hospital_Name} - {name}
              </Text>
            </Box>
            <Text dir="none" float="right" fontSize={11} color="gray">
              {moment(created_at).startOf("hour").fromNow()}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

MessageComponent.propTypes = {
  PK_hospital_ID: PropTypes.string,
  profile: PropTypes.string,
  name: PropTypes.string,
  hospital_Name: PropTypes.string,
  comment: PropTypes.string,
  created_at: PropTypes.date,
  fileNames: PropTypes.string,
};

export default MessageComponent;
