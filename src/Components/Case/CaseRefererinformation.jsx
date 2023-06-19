import { Box, Text } from "@chakra-ui/react";
import { FaHospital, FaBriefcaseMedical } from "react-icons/fa";
import { GiSkills } from "react-icons/gi";
import { BsPersonCircle } from "react-icons/bs";
import PropTypes from "prop-types";

const CaseReferrerInformation = ({
  profile_FirstName,
  profile_LastName,
  case_number,
  specialization,
  hospital_Name,
}) => {
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
        <BsPersonCircle color="green" size="25" />
        <Text fontSize={18} fontWeight={600} color="green">
          {`${profile_FirstName} ${profile_LastName}`}
        </Text>
      </Box>
      <Box display="flex" columnGap={3}>
        <FaBriefcaseMedical color="green" size="23" />
        <Text fontSize={18} fontWeight={600} color="green">
          CASE #{case_number}
        </Text>
      </Box>
      <Box display="flex" columnGap={3}>
        <GiSkills color="gray" size="25" />
        <Text fontSize={18} fontWeight={500} color="gray">
          {specialization}
        </Text>
      </Box>
      <Box display="flex" columnGap={3}>
        <FaHospital color="gray" size="25" />
        <Text fontSize={18} fontWeight={500} color="gray">
          {hospital_Name}
        </Text>
      </Box>
    </Box>
  );
};

CaseReferrerInformation.propTypes = {
  profile_FirstName: PropTypes.string,
  profile_LastName: PropTypes.string,
  case_number: PropTypes.string,
  specialization: PropTypes.string,
  hospital_Name: PropTypes.string,
};

export default CaseReferrerInformation;
