import { Box } from "@chakra-ui/react";
import AnimationCaseReferrerInformation from "./AnimationCaseReferrerInformation";
import AnimatinoPatientProfile from "./AnimationPatientProfile";
import AnimationBodyInformation from "./AnimationBodyInformation";
import AnimationCaseMainInformation from "./AnimationCaseMainInformation";

const AnimationCaseInformation = () => {
  return (
    <Box w="inherit" pl={5}>
      <Box
        h={["45vh", "50vh", "94vh", "94vh"]}
        overflow={"auto"}
        pt={10}
        pb={[0, 0, 10, 10]}
      >
        <AnimationCaseReferrerInformation />
        <AnimatinoPatientProfile />
        <Box pt={5} pr={5}>
          <AnimationBodyInformation />
          <AnimationCaseMainInformation />
        </Box>
      </Box>
    </Box>
  );
};

export default AnimationCaseInformation;
