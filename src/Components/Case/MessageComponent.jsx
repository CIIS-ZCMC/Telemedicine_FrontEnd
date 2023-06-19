import { Avatar, Box, Text } from "@chakra-ui/react";
import moment from "moment/moment";
import MessageFile from "./MessageFile";
import PropTypes from "prop-types";

const MessageComponent = ({
  PK_hospital_ID,
  hospital_Name,
  comment,
  name,
  created_at,
  profile,
  files,
}) => {
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
        <Box>
          <Box dir={PK_hospital_ID === 1 ? "rtl" : "none"}>
            <Text fontSize={12}>
              {hospital_Name} - {name}
            </Text>
            <Text
              w={"auto"}
              bg="white"
              p={3}
              rounded={10}
              boxShadow="md"
              dir="ltr"
            >
              {comment}
            </Text>
          </Box>
          <Text dir="none" float="right" fontSize={11} color="gray">
            {moment(created_at).startOf("hour").fromNow()}
          </Text>
        </Box>
        <Box w="inherit" mt={2} display="flex" flexWrap="wrap" columnGap={3}>
          {files.map((file, index) => {
            let desctuctureFileURL = file.file_url.split("/");
            return (
              <MessageFile
                key={index}
                file={file.file_url}
                filename={
                  file.file_url === null
                    ? "File Missing."
                    : desctuctureFileURL[desctuctureFileURL.length - 1]
                }
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

MessageComponent.propTypes = {
  PK_hospital_ID: PropTypes.object,
  hospital_Name: PropTypes.object,
  comment: PropTypes.object,
  name: PropTypes.object,
  created_at: PropTypes.object,
  profile: PropTypes.object,
  files: PropTypes.object,
};

export default MessageComponent;
