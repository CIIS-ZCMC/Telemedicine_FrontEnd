import { useEffect, useState, useRef, useCallback } from "react";
import { Box, Text } from "@chakra-ui/react";
import { GetRequest } from "../../API/api";
import { Message } from "../../API/Paths";
import moment from "moment/moment";
import useCase from "../../Pages/Case SubCollection/CaseContext";
import MessageComponent from "./MessageComponent";
import PropTypes from "prop-types";

const CaseMessage = ({ id, setFetchMessage, date }) => {
  const [messages, setMessages] = useState([]);
  const [fetch, setFetch] = useState(true);
  const [init, setInit] = useState(true);
  const messageRef = useRef(null);
  const { fetchMessage } = useCase();

  const handleInitialization = useCallback(() => {
    GetRequest({ url: `${Message}/${id}` })
      .then((res) => res.data)
      .then((res) => {
        if (!res.statusText === "OK") {
          throw new Error("Bad response.");
        }
        const { data } = res;
        if (data.length === messages.length) {
          return;
        }
        setMessages(data);
      })
      .catch((err) => {
        const { status } = err;
        switch (status) {
          case 400:
            console.log("Can't complete request right now. try again later.");
            break;
          case 404:
            console.log("No record found.");
            break;
          default:
            console.log("Can't process request right now. Try again later");
            break;
        }
      });
  }, [id, messages]);

  useEffect(() => {
    const intervalId = setInterval(
      () => {
        if (init) {
          setInit(false);
        }
        if (fetchMessage) {
          setFetchMessage(false);
        }
        handleInitialization();
      },
      init ? 0 : 6000
    );

    return () => clearInterval(intervalId);
  }, [handleInitialization, setFetchMessage, fetchMessage, init]);

  useEffect(() => {
    if (fetch) {
      messageRef.current?.scrollIntoView();
    }

    return () => setFetch(false);
  }, [messages, fetch]);

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
        {messages.map((value, index) => {
          return <MessageComponent key={index} value={value} />;
        })}
      </Box>
      <Box h={0} ref={messageRef} />
    </Box>
  );
};

CaseMessage.propTypes = {
  id: PropTypes.string,
  setFetchMessage: PropTypes.function,
  date: PropTypes.date,
};

export default CaseMessage;
