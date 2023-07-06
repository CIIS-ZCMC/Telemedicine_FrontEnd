import { Box, Heading } from "@chakra-ui/react";
import AnimationCaseMessage from "./AnimationCaseMessage";
import AnimationCaseCreateMessage from "./AnimationCaseCreateMessage";

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

const AnimationMessage = () => {
  return (
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
      <AnimationCaseMessage />
      <AnimationCaseCreateMessage />
    </Box>
  );
};

export default AnimationMessage;
