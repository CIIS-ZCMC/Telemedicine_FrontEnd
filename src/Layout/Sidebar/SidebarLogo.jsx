import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import useThemeHook from "../../Hooks/useThemeHook";

const SidebarLogo = () => {
  const { systemLogo, owner, systemName, primary } = useThemeHook();

  return (
    <Flex
      w="100%"
      h="60px"
      pt={10}
      pl={5}
      pb={0}
      gap={3}
      justifyContent="start"
      alignItems="center"
    >
      <Image src={systemLogo} w={12} />
      <Box>
        <Heading color={primary} size="md">
          {systemName}
        </Heading>
        <Text fontSize={10} letterSpacing={1} fontWeight="700">
          {owner}
        </Text>
      </Box>
    </Flex>
  );
};

export default SidebarLogo;
