import { Box, Text, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import PropTypes from "prop-types";

const AnimationPatientMedicalBodyInformation = ({ title, icon }) => {
  return (
    <Box
      w={["25rem", "25rem", "15rem", "15rem"]}
      boxShadow={"md"}
      rounded={5}
      bg="white"
      p={3}
      display="flex"
      justifyContent="space-between"
    >
      <Box>
        <Skeleton h="4rem" mb={2} />
        <Text>{title}</Text>
      </Box>
      {icon}
    </Box>
  );
};

AnimationPatientMedicalBodyInformation.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.object,
};

const AnimationBodyInformation = () => {
  return (
    <Box w="inherit" display="flex" flexWrap="wrap" columnGap={5} rowGap={5}>
      <AnimationPatientMedicalBodyInformation
        title="Temperature"
        icon={<SkeletonCircle size={"4rem"} />}
      />
      <AnimationPatientMedicalBodyInformation
        title="Respiratory Rate"
        icon={<SkeletonCircle size={"4rem"} />}
      />
      <AnimationPatientMedicalBodyInformation
        title="Heart Rate"
        icon={<SkeletonCircle size={"4rem"} />}
      />
      <AnimationPatientMedicalBodyInformation
        title="Blood Pressure"
        icon={<SkeletonCircle size={"4rem"} />}
      />
      <AnimationPatientMedicalBodyInformation
        title="Oxygen Saturation"
        icon={<SkeletonCircle size={"4rem"} />}
      />
      <AnimationPatientMedicalBodyInformation
        title="Weight"
        icon={<SkeletonCircle size={"4rem"} />}
      />
      <AnimationPatientMedicalBodyInformation
        title="Height"
        icon={<SkeletonCircle size={"4rem"} />}
      />
    </Box>
  );
};

export default AnimationBodyInformation;
