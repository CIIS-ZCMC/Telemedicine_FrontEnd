import { Box, Flex } from "@chakra-ui/react";
import AnimationConsultHeader from "./AnimationConsultHeader";
import AnimationCaseInformation from "./Case Information/AnimationCaseInformation";
import AnimationMessage from "./Message/AnimationMessage";

const AnimationConsult = () => {
  return (
    <>
      <Flex
        w="inherit"
        overflow={["visible", "visible", "hidden", "hidden"]}
        flexDirection={["column", "column", "row", "row"]}
      >
        <Box w="inherit" flex={8}>
          <AnimationConsultHeader />
          <AnimationCaseInformation />
        </Box>
        <AnimationMessage />
      </Flex>
    </>
  );
};

export default AnimationConsult;
