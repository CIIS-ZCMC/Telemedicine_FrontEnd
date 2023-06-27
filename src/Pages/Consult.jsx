import { useState, useEffect, useCallback } from "react";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { Case } from "../API/Paths";
import { GetRequest } from "../API/api";
import ConsultHeader from "../Components/Case/ConsultHeader";
import CaseInformation from "../Components/Case/CaseInformation";
import PostSpecializationModal from "../Components/PostSpecializationModal";
import Message from "../Components/Message/Messsage";

const Consult = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [caseCollection, setCaseCollection] = useState(null);
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
        console.log(res.data);
        setCaseCollection(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [state]);

  useEffect(() => {
    if (caseCollection === null) {
      console.log("test");
      handleFetchCase();
    }
  }, [caseCollection, handleFetchCase]);

  if (caseCollection === null) {
    return <Box>Loading </Box>;
  }

  return (
    <>
      <Flex
        w="inherit"
        overflow={["visible", "visible", "hidden", "hidden"]}
        flexDirection={["column", "column", "row", "row"]}
      >
        <Box w="inherit" flex={8}>
          <ConsultHeader id={state[0]} onOpen={onOpen} />
          <CaseInformation caseCollection={caseCollection} id={state[0]} />
        </Box>
        <Message id={state[0]} date={caseCollection.date} />
      </Flex>
      <PostSpecializationModal
        onClose={onClose}
        isOpen={isOpen}
        caseID={state[0]}
      />
    </>
  );
};

export default Consult;
