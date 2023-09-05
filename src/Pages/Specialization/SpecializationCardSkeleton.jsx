import { Box, Flex, Skeleton } from "@chakra-ui/react";

const SpecializationCardSkeleton = () => {
  return (
    <Box w="20rem" borderRadius={10} boxShadow="lg" p={5}>
      <Skeleton w="100%" h="1rem" />
      <Box mt={3} h="2rem" overflowWrap="break-word" fontSize={13} mb={5}>
        <Skeleton w="100%" h="2rem" />
      </Box>
      <Flex alignItems="center" justifyContent="space-between">
        <Skeleton w="35%" h="1.3rem" />
        <Skeleton w="25%" h="1.3rem" />
      </Flex>
    </Box>
  );
};

export default SpecializationCardSkeleton;
