import { Avatar, Box, Center, Flex, Skeleton } from "@chakra-ui/react";

const ProfileCardSkeleton = () => {
  return (
    <Box p={0} boxShadow="md" borderRadius={10} bg="white" overflow="hidden">
      <Center bg="blasckAlpha.100" p={5} pb={2}>
        <Avatar src="" size="2xl" />
      </Center>
      <Box mt={5} fontSize={13} p={5} pt={0}>
        <Skeleton h="1rem" />
        <Skeleton h="0.5rem" />
        <Skeleton h="0.5rem" />

        <Flex mt={5} justifyContent="space-between" gap={5} alignItems="center">
          <Box>
            <Skeleton h="0.5rem" />
          </Box>

          <Skeleton h="0.5rem" />
        </Flex>
      </Box>
    </Box>
  );
};

export default ProfileCardSkeleton;
