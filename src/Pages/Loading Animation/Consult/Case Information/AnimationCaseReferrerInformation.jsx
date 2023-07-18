import { Box, Flex, Skeleton } from "@chakra-ui/react";
import { FaHospital, FaBriefcaseMedical } from "react-icons/fa";
import { GiSkills } from "react-icons/gi";
import { BsPersonCircle } from "react-icons/bs";
import PropTypes from "prop-types";

const icons = [
  {
    icon: <BsPersonCircle color="green" size="25" />,
    width: 220,
  },
  {
    icon: <FaBriefcaseMedical color="green" size="23" />,
    width: 150,
  },
  {
    icon: <GiSkills color="gray" size="25" />,
    width: 200,
  },
  {
    icon: <FaHospital color="gray" size="25" />,
    width: 250,
  },
];

const FlexSkeleton = ({ icon, width }) => {
  return (
    <Flex align={"center"} columnGap={3}>
      {icon}
      <Skeleton w={width} h={6} />
    </Flex>
  );
};

FlexSkeleton.propTypes = {
  icon: PropTypes.object,
  width: PropTypes.number,
};

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
      {icons.map((value, index) => {
        return <FlexSkeleton key={index} {...value} />;
      })}
    </Box>
  );
};

export default AnimationCaseReferrerInformation;
