import { Box } from "@chakra-ui/react";
import PatientProfile from "./PatientProfile";
import CaseParaclinicalFiles from "./CaseParaclinicalFiles";
import BodyInformation from "./BodyInformation";
import CaseMainInformation from "./CaseMainInformation";
import CaseReferrerInformation from "./CaseRefererinformation";
import PropTypes from "prop-types";

const CaseInformation = ({ id, caseCollection }) => {
  return (
    <Box w="inherit" pl={5}>
      <Box
        h={["45vh", "50vh", "94vh", "94vh"]}
        overflow={"auto"}
        pt={10}
        pb={[0, 0, 10, 10]}
      >
        <CaseReferrerInformation {...caseCollection} />
        <PatientProfile id={id} />
        <Box pt={5} pr={5}>
          <BodyInformation {...caseCollection} />
          <CaseMainInformation {...caseCollection} />
          <CaseParaclinicalFiles id={id} />
        </Box>
      </Box>
    </Box>
  );
};

CaseInformation.propTypes = {
  id: PropTypes.string,
  caseCollection: PropTypes.object,
};

export default CaseInformation;
