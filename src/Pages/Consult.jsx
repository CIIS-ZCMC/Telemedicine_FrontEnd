import { useState, useEffect, useCallback } from "react";
import { Box, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { Case } from "../API/Paths";
import { PutRequest } from "../API/api";
import ConsultHeader from "../Components/Case/ConsultHeader";
import CaseInformation from "../Components/Case/CaseInformation";
import CaseCreateMessage from "../Components/Case/CaseCreateMessage";
import CaseMessage from "../Components/Case/CaseMessage";
import useAuth from "../Hooks/AuthContext";
import PostSpecializationModal from "../Components/PostSpecializationModal";

const MessageComponentHeader = () => {
  return (
    <Box
      w="inheirt"
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
    </Box>
  );
};

const Consult = () => {
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fetchMessage, setFetchMessage] = useState(true);
  const location = useLocation();

  const caseinfo = useState(location.state);

  const handleUpdateCase = useCallback(async () => {
    if (caseinfo.cases_status === 0) {
      try {
        let formData = new FormData();
        formData.append("PK_cases_ID", caseinfo[0].PK_cases_ID);
        formData.append("cases_status", 1);

        const res = await PutRequest({ url: `${Case}/status` }, formData);

        if (!res.statusText === "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        caseinfo.cases_status = 1;
      } catch (err) {
        console.log(err);
      }
    }
  }, [caseinfo]);

  useEffect(() => {
    if (user.user_role !== "External Doctor") {
      handleUpdateCase();
    }
  }, [user.user_role, handleUpdateCase]);

  return (
    <>
      <Flex
        w="inherit"
        overflow={["visible", "visible", "hidden", "hidden"]}
        flexDirection={["column", "column", "row", "row"]}
      >
        <Box w="inherit" flex={8}>
          <ConsultHeader
            id={caseinfo.id}
            casenumber={caseinfo.case_number}
            specialization={caseinfo.specialization}
            hospital={caseinfo.hospital_Name}
            isPendingStatus={caseinfo.case_status}
            onOpen={onOpen}
          />
          <CaseInformation id={caseinfo.id} data={caseinfo} />
        </Box>
        <Box
          w="inherit"
          flex={5}
          bg="#edf0f6"
          h={["35vh", "35vh", "90vh", "100vh"]}
          overflow={["visible", "visible", "hidden", "hidden"]}
          display="flex"
          flexDirection="column"
        >
          <MessageComponentHeader />
          <CaseMessage
            id={caseinfo.id}
            date={caseinfo.date}
            fetchMessage={fetchMessage}
            setFetchMessage={setFetchMessage}
          />
          <CaseCreateMessage
            id={caseinfo.id}
            setFetchMessage={setFetchMessage}
          />
        </Box>
      </Flex>
      <PostSpecializationModal
        onClose={onClose}
        isOpen={isOpen}
        caseID={caseinfo.id}
      />
    </>
  );
};

export default Consult;
