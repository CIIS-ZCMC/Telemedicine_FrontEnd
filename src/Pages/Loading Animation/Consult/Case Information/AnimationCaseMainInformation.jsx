import { Box, Text, Skeleton } from "@chakra-ui/react";
import PropTypes from "prop-types";

const AnimationCaseMainInformationComponent = ({ header }) => {
  return (
    <Box mt={5}>
      <Box
        maxW={[250, 250, 350, 350]}
        pl={2}
        pt={1}
        bg="gray"
        color="white"
        borderTopLeftRadius={8}
        borderTopRightRadius={30}
      >
        <Text fontSize={[12, 12, 18, 18]}>{header.toLocaleUpperCase()}</Text>
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
  header: PropTypes.string,
};

const AnimationCaseMainInformation = () => {
  return (
    <Box>
      <AnimationCaseMainInformationComponent header={"Chief Complaint"} />
      <AnimationCaseMainInformationComponent
        header={"Pertinent History of Present Illness"}
      />
      <AnimationCaseMainInformationComponent
        header={"Pertinent Past Medical History"}
      />
      <AnimationCaseMainInformationComponent header={"Pertinent PE Findings"} />
      <AnimationCaseMainInformationComponent header={"Working Impression"} />
      <AnimationCaseMainInformationComponent
        header={"Initial Management Done"}
      />
      <AnimationCaseMainInformationComponent header={"Reason for Referral"} />
    </Box>
  );
};

export default AnimationCaseMainInformation;
