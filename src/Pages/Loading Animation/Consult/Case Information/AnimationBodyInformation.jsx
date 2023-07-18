import { Box, Text, Skeleton } from "@chakra-ui/react";
import {
  FaTemperatureLow,
  FaHeartbeat,
  FaLungs,
  FaWeight,
} from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";
import { SiOxygen } from "react-icons/si";
import { GiBodyHeight } from "react-icons/gi";
import PropTypes from "prop-types";

const iconSize = 24;

const skeletonData = [
  {
    title: "Temperature",
    icon: <FaTemperatureLow size={iconSize} color="skyblue" />,
  },
  {
    title: "Respiratory Rate",
    icon: <FaLungs size={iconSize} color="green" />,
  },
  {
    title: "Heart Rate",
    icon: <FaHeartbeat size={iconSize} color="red" />,
  },
  {
    title: "Blood Pressure",
    icon: <MdBloodtype size={iconSize} color="darkred" />,
  },
  {
    title: "Respiratory Rate",
    icon: <SiOxygen size={iconSize} color="darkgreen" />,
  },
  {
    title: "Heart Rate",
    icon: <FaWeight size={iconSize} color="gray" />,
  },
  {
    title: "Blood Pressure",
    icon: <GiBodyHeight size={iconSize} color="gray" />,
  },
];

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
        <Skeleton h="3rem" mb={2} />
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
      {skeletonData.map((value, index) => (
        <AnimationPatientMedicalBodyInformation key={index} {...value} />
      ))}
    </Box>
  );
};

export default AnimationBodyInformation;
