import { Box, Skeleton } from "@chakra-ui/react";
import AnimationMessageComponent from "./AnimationMessageComponent";

const AnimationCaseMessage = () => {
  return (
    <Box
      w="inherit"
      h={["35vh", "50vh", "90vh", "90vh"]}
      overflow="auto"
      display="flex"
      flexDirection="column"
    >
      <Box>
        <Skeleton size={14} />
      </Box>
      <Box mt="3rem" scrollBehavior="smooth">
        {[1, 2, 3, 4, 5].map((value) => {
          return <AnimationMessageComponent key={value} position={value} />;
        })}
      </Box>
    </Box>
  );
};

export default AnimationCaseMessage;
