import { Box, Text, Skeleton } from "@chakra-ui/react";
import PropTypes from "prop-types";

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

const AnimationCaseMainInformationComponent = ({ title, width }) => {
  return (
    <Box mt={5}>
      <Box
        maxW={width}
        pl={2}
        pt={1}
        bg="gray"
        color="white"
        borderTopLeftRadius={8}
        borderTopRightRadius={30}
      >
        <Text fontSize={[12, 12, 18, 18]}>{title.toLocaleUpperCase()}</Text>
      </Box>
      <Box
        border="1px solid gray"
        p={2}
        borderBottomRadius={8}
        borderRightRadius={8}
      >
        <Skeleton h={20} rounded={5} size={[12, 12, 18, 18]} />
      </Box>
    </Box>
  );
};

AnimationCaseMainInformationComponent.propTypes = {
  title: PropTypes.string,
  width: PropTypes.number,
};

const AnimationCaseMainInformation = () => {
  return (
    <Box>
      {caseInfoData.map((value, index) => (
        <AnimationCaseMainInformationComponent key={index} {...value} />
      ))}
    </Box>
  );
};

export default AnimationCaseMainInformation;
