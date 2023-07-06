import { Box, Skeleton } from "@chakra-ui/react";

const TextDisplay = () => {
  return (
    <Box>
      <Skeleton h={14} size={14} />
      <Skeleton h={12} size={12} />
    </Box>
  );
};

const AnimatinoPatientProfile = () => {
  return (
    <Box
      h="inheirt"
      display="flex"
      flexDirection={["column", "column", "row", "row"]}
      columnGap={8}
      alignItems="start"
      p={2}
    >
      <Box
        w={"100%"}
        display="flex"
        justifyContent={["center", "center", "start", "start"]}
        p={[2, 2, 0, 0]}
      >
        <Box w="10rem">
          <Skeleton h="10rem" size="10rem" />
        </Box>
      </Box>
      <Box
        display="flex"
        columnGap={12}
        rowGap={5}
        flexWrap="wrap"
        alignItems="end"
        pt="2"
        pr={3}
      >
        <TextDisplay />
        <TextDisplay />
        <TextDisplay />
        <TextDisplay />
        <TextDisplay />
        <TextDisplay />
        <TextDisplay />
        <TextDisplay />
        <TextDisplay />
      </Box>
    </Box>
  );
};

export default AnimatinoPatientProfile;
