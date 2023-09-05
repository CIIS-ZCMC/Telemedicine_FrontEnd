import { useState, useEffect, useCallback } from "react";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { Case } from "../Services/Paths";
import { GetRequest } from "../Services/api";
import ConsultHeader from "../Components/Case/ConsultHeader";
import CaseInformation from "../Components/Case/CaseInformation";
import PostSpecializationModal from "../Components/PostSpecializationModal";
import Message from "../Components/Message/Messsage";
import { connectToSocket } from "../Services/socket_connection";
import AnimationConsultHeader from "./Loading Animation/Consult/AnimationConsultHeader";
import AnimationCaseInformation from "./Loading Animation/Consult/Case Information/AnimationCaseInformation";

const Consult = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [caseCollection, setCaseCollection] = useState(null);
  const [connectSocket, setConnectSocket] = useState(true);
  const location = useLocation();

  const state = useState(location.state);

  const handleFetchCase = useCallback(async () => {
    GetRequest({ url: `${Case}/c/${state[0]}` })
      .then((res) => {
        if (res.statusText !== "OK") {
          throw new Error("Bad response", { cause: res });
        }
        return res.data;
      })
      .then((res) => {
        setCaseCollection(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [state]);

  useEffect(() => {
    if (caseCollection === null) {
      handleFetchCase();
    }
  }, [caseCollection, handleFetchCase]);

  useEffect(() => {
    if (connectSocket) {
      connectToSocket();
    }

    return () => setConnectSocket(false);
  }, [connectSocket]);

  return (
    <>
      <Flex
        w="inherit"
        overflow={["visible", "visible", "hidden", "hidden"]}
        flexDirection={["column", "column", "row", "row"]}
      >
        <Box w="inherit" h={500} flex={8}>
          {caseCollection === null ? (
            <AnimationConsultHeader />
          ) : (
            <ConsultHeader id={state[0]} onOpen={onOpen} />
          )}
          {caseCollection === null ? (
            <AnimationCaseInformation />
          ) : (
            <CaseInformation caseCollection={caseCollection} id={state[0]} />
          )}
        </Box>
        <Message id={state[0]} caseCollection={caseCollection} />
      </Flex>
      {caseCollection === null ? null : (
        <PostSpecializationModal
          onClose={onClose}
          isOpen={isOpen}
          caseID={state[0]}
        />
      )}
    </>
  );
};

export default Consult;
