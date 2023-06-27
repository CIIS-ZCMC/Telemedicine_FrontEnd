import { useEffect, useState, useRef } from "react";
import { Box, Text } from "@chakra-ui/react";
import moment from "moment/moment";
import MessageComponent from "./MessageComponent";
import PropTypes from "prop-types";
import { io } from "socket.io-client";

const CaseMessage = ({ id, date }) => {
  const [fetch, setFetch] = useState(true);
  const messageRef = useRef(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:8573");

    // Listen for the "todos" event
    socket.on("connect", () => {
      console.log("Connected to the server.");

      // Send a message to the server
      socket.emit("message", id);
    });

    socket.on("message", (message) => {
      setMessage(message);
    });

    return () => {
      socket.disconnect();
      console.log("Socket disconnected.");
    };
  }, []);

  useEffect(() => {
    if (fetch) {
      messageRef.current?.scrollIntoView();
    }

    return () => setFetch(false);
  }, [fetch, message]);

  if (message === null) {
    return <Box>Loading</Box>;
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
        {message.map((value, index) => {
          return <MessageComponent key={index} {...value} />;
        })}
      </Box>
      <Box h={0} ref={messageRef} />
    </Box>
  );
};

CaseMessage.propTypes = {
  id: PropTypes.string,
  date: PropTypes.date,
};

export default CaseMessage;
