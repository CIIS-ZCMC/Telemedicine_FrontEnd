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

const CaseMainInformation = ({ cc, hpi, pmh, pe, wi, imd, reson }) => {
  return (
    <Box>
      {[cc, hpi, pmh, pe, wi, imd, reson].map((value, index) => (
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
  cc: PropTypes.string,
  hpi: PropTypes.string,
  pmh: PropTypes.string,
  pe: PropTypes.string,
  wi: PropTypes.string,
  imd: PropTypes.string,
  reson: PropTypes.string,
};

export default CaseMainInformation;
