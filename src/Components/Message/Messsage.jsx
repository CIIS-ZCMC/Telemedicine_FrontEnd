import { Box, Heading } from "@chakra-ui/react";
import CaseCreateMessage from "../Case/CaseCreateMessage";
import CaseMessage from "../Case/CaseMessage";
import AnimationCaseMessage from "../../Pages/Loading Animation/Consult/Message/AnimationCaseMessage";
import VideoButton from "../../Pages/Video Call/VideoButton";
import PropTypes from "prop-types";

const MessageComponentHeader = ({ caseId }) => {
  return (
    <Box
      w="inherit"
      h={["3rem", "3rem", "4rem", "4rem"]}
      bg="#edeff3"
      boxShadow="lg"
      p={5}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Heading size={["sm", "sm", "md", "md"]} color="green">
        {"Case Chat".toLocaleUpperCase()}
      </Heading>
      <VideoButton caseId={caseId} />
    </Box>
  );
};

MessageComponentHeader.propTypes = {
  caseId: PropTypes.number,
};

const Message = ({ id, caseCollection }) => {
  return (
    <Box
      w="inherit"
      flex={5}
      bg="#edf0f6"
      h={["35vh", "35vh", "90vh", "100vh"]}
      overflow={["visible", "visible", "hidden", "hidden"]}
      display="flex"
      flexDirection="column"
    >
      <MessageComponentHeader caseId={id} />
      {caseCollection === null ? (
        <AnimationCaseMessage />
      ) : (
        <CaseMessage id={id} date={caseCollection.date} />
      )}
      <CaseCreateMessage id={id} />
    </Box>
  );
};

Message.propTypes = {
  id: PropTypes.string,
  caseCollection: PropTypes.object,
};

export default Message;
