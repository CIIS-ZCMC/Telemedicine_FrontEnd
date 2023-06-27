import { Avatar, Box, Text } from "@chakra-ui/react";
import moment from "moment/moment";
import MessageFile from "./MessageFile";
import PropTypes from "prop-types";

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

  return (
    <Box
      w="100%"
      float={PK_hospital_ID === 1 ? "right" : "left"}
      display="flex"
      flexDirection={PK_hospital_ID === 1 ? "row-reverse" : "row"}
      alignItems="center"
      p={3}
      columnGap={5}
      mb={5}
    >
      <Avatar src={profile} name={name} size="sm" />
      <Box>
        <FileList files={fileNames} />
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
              {data}
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
  );
};

const FileList = (prop) => {
  if (prop.files !== null) {
    let files = prop.files.split(",");

    if (files.length > 1) {
      return (
        <Box w="inherit" mt={2} display="flex" flexWrap="wrap" columnGap={3}>
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
        </Box>
      );
    }

    if (!Array.isArray(prop.files)) {
      let desctuctureFileURL = prop.files.split("/");
      console.log(
        `files is not null : ${
          desctuctureFileURL[desctuctureFileURL.length - 1]
        }`
      );

      return (
        <Box w="inherit" mt={2} display="flex" flexWrap="wrap" columnGap={3}>
          <MessageFile
            file={prop.files}
            filename={desctuctureFileURL[desctuctureFileURL.length - 1]}
          />
        </Box>
      );
    }
  }

  return null;
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
