import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";
import CaseMainInformationComponent from "./CaseMainInformationComponent";

const caseInfoData = [
  {
    title: "CHIEF COMPLAINT",
    width: ["10rem", "10rem", "10rem", "13rem"],
  },
  {
    title: "PERTINENT HISTORY OF PRESENT ILLNESS",
    width: ["10rem", "10rem", "10rem", "25rem"],
  },
  {
    title: "PERTINENT PAST MEDICAL HISTORY",
    width: ["10rem", "10rem", "10rem", "22rem"],
  },
  {
    title: "PERTINENT PE FINDINGS",
    width: ["10rem", "10rem", "10rem", "16rem"],
  },
  {
    title: "WORKING IMPRESSION",
    width: ["10rem", "10rem", "10rem", "16rem"],
  },
  {
    title: "INITIAL MANAGEMENT DONE",
    width: ["10rem", "10rem", "10rem", "18rem"],
  },
  {
    title: "REASON FOR REFERRAL",
    width: ["10rem", "10rem", "10rem", "16rem"],
  },
];

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
      {[
        cases_CC,
        cases_HPI,
        cases_PMH,
        cases_PE,
        cases_WI,
        cases_IMD,
        cases_Reason,
      ].map((value, index) => (
        <CaseMainInformationComponent
          key={index}
          {...caseInfoData[index]}
          data={value}
        />
      ))}
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
