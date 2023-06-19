import { Box, Heading, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

const PatientMedicalBodyInformation = ({ value, title, icon }) => {
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
        <Heading>{value}</Heading>
        <Text> {title}</Text>
      </Box>
      {icon}
    </Box>
  );
};

PatientMedicalBodyInformation.propTypes = {
  value: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.icon,
};

export default PatientMedicalBodyInformation;
