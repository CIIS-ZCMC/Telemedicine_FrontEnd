import { Box, Skeleton, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

const skeletonData = [
  {
    title: "Name (Last, First Mi)",
    width: "18%",
  },
  {
    title: "Age",
    width: "18%",
  },
  {
    title: "Sex",
    width: "7%",
  },
  {
    title: "Civil Status",
    width: "9%",
  },
  {
    title: "Contact",
    width: "9%",
  },
  {
    title: "Birth place",
    width: "9%",
  },
  {
    title: "Ethnicity",
    width: "15%",
  },
  {
    title: "Dialect",
    width: "15%",
  },
  {
    title: "Address (Street, Barangay, City)",
    width: "30%",
  },
];

const TextDisplay = ({ title, width }) => {
  return (
    <Box w={width}>
      <Text fontSize={14} size="xs">
        {title}
      </Text>
      <Skeleton h={4} size={"sm"} />
    </Box>
  );
};

TextDisplay.propTypes = {
  title: PropTypes.string,
  width: PropTypes.number,
};

const AnimatinoPatientProfile = () => {
  return (
    <Box
      h="22%"
      display="flex"
      flexDirection={["column", "column", "row", "row"]}
      columnGap={8}
      alignItems="start"
      p={2}
      mb={5}
    >
      <Box
        h="100%"
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
        w="100%"
        h="100%"
        columnGap={12}
        flexWrap="wrap"
        alignItems="end"
        mt={-8}
      >
        {skeletonData.map((value, index) => {
          return <TextDisplay key={index} {...value} />;
        })}
      </Box>
    </Box>
  );
};

export default AnimatinoPatientProfile;
