import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";
import CaseMainInformationComponent from "./CaseMainInformationComponent";

const CaseMainInformation = ({
  cases_CC,
  cases_HPI,
  cases_PMH,
  cases_PE,
  cases_WI,
  cases_IMD,
  cases_Reason,
}) => {
  return (
    <Box>
      <CaseMainInformationComponent
        header={"Chief Complaint"}
        data={cases_CC}
      />
      <CaseMainInformationComponent
        header={"Pertinent History of Present Illness"}
        data={cases_HPI}
      />
      <CaseMainInformationComponent
        header={"Pertinent Past Medical History"}
        data={cases_PMH}
      />
      <CaseMainInformationComponent
        header={"Pertinent PE Findings"}
        data={cases_PE}
      />
      <CaseMainInformationComponent
        header={"Working Impression"}
        data={cases_WI}
      />
      <CaseMainInformationComponent
        header={"Initial Management Done"}
        data={cases_IMD}
      />
      <CaseMainInformationComponent
        header={"Reason for Referral"}
        data={cases_Reason}
      />
    </Box>
  );
};

CaseMainInformation.propTypes = {
  cases_CC: PropTypes.string,
  cases_HPI: PropTypes.string,
  cases_PMH: PropTypes.string,
  cases_PE: PropTypes.string,
  cases_WI: PropTypes.string,
  cases_IMD: PropTypes.string,
  cases_Reason: PropTypes.string,
};

export default CaseMainInformation;
