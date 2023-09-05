import { useEffect, useState, useRef } from "react";
import { Box, Text } from "@chakra-ui/react";
import moment from "moment/moment";
import MessageComponent from "./MessageComponent";
import PropTypes from "prop-types";
import { initializeMessageID, socket } from "../../Services/socket_connection";
import AnimationCaseMessage from "../../Pages/Loading Animation/Consult/Message/AnimationCaseMessage";

const CaseMessage = ({ id, date }) => {
  const messageRef = useRef(null);
  const [firstRender, setFirstRender] = useState(true);
  const [messages, setMessage] = useState([]);
  const [messagesUI, setMessageUI] = useState([]);

  useEffect(() => {
    initializeMessageID(id);

    socket.on("message", (data) => {
      setMessage(data);
    });
  });

  useEffect(() => {
    if (messagesUI.length !== messages.length) {
      setFirstRender(true);
      setMessageUI(
        messages.map((value, index) => {
          return <MessageComponent key={index} {...value} />;
        })
      );
    }

    if (firstRender && messages !== null) {
      messageRef.current?.scrollIntoView();
      setFirstRender(false);
    }
  }, [messages]);

  if (messages === null) {
    return <AnimationCaseMessage />;
  }

  return (
    <Box
      w="inherit"
      h={["35vh", "50vh", "90vh", "90vh"]}
      overflow="auto"
      display="flex"
      flexDirection="column"
    >
      <Box>
        <Text mt={5} textAlign="center" color="gray">
          {moment(date).format("MMMM DD, YYYY")}
        </Text>
      </Box>
      <Box mt="3rem" scrollBehavior="smooth">
        {messagesUI.map((messageUI) => messageUI)}
      </Box>
      <Box h={0} ref={messageRef} />
    </Box>
  );
};

CaseMessage.propTypes = {
  id: PropTypes.number,
  date: PropTypes.object,
};

export default CaseMessage;
