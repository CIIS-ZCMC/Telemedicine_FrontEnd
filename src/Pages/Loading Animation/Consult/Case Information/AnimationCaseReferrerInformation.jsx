import { Box, Skeleton, SkeletonCircle } from "@chakra-ui/react";

const AnimationCaseReferrerInformation = () => {
  return (
    <Box
      display="flex"
      flexDirection={["column", "column", "row", "row"]}
      mb={2}
      justifyContent="start"
      columnGap={5}
      rowGap={5}
      p={5}
      border="1px solid rgba(0,0,0,0.2)"
      rounded={10}
      mr={5}
    >
      <Box display="flex" columnGap={3}>
        <SkeletonCircle size={25} />
        <Skeleton w={150} h={10} />
      </Box>
      <Box display="flex" columnGap={3}>
        <SkeletonCircle size={25} />
        <Skeleton w={150} h={10} />
      </Box>
      <Box display="flex" columnGap={3}>
        <SkeletonCircle size={25} />
        <Skeleton w={150} h={10} />
      </Box>
      <Box display="flex" columnGap={3}>
        <SkeletonCircle size={25} />
        <Skeleton w={150} h={10} />
      </Box>
    </Box>
  );
};

export default AnimationCaseReferrerInformation;
