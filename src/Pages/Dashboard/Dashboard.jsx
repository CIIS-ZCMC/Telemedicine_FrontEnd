import { Box, Heading, Flex, Text } from "@chakra-ui/react";
import { FaHospitalAlt, FaBriefcaseMedical, FaUserMd } from "react-icons/fa";
import { GiSkills } from "react-icons/gi";
import PendingCase from "./PendingCase";
import BarChartComponent from "./BarChartComponent";
import PropTypes from "prop-types";

function cardIcon(name) {
  switch (name?.toLocaleLowerCase()) {
    case "hospital":
      return <FaHospitalAlt size={45} color="gray" />;
    case "doctor":
      return <FaUserMd size={45} color="gray" />;
    case "specialization":
      return <GiSkills size={45} color="gray" />;
    case "case":
      return <FaBriefcaseMedical size={45} color="gray" />;
  }
}

const DashboardCard = ({ name, description, value }) => {
  return (
    <Box
      w="25%"
      h="8rem"
      bg="white"
      boxShadow="md"
      p={5}
      borderRadius={10}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      gap={10}
    >
      <Heading size="2xl" color="blackAlpha.800">
        {value}
      </Heading>
      <Box flex={2}>
        <Heading size="md" color="gray" mb={2}>
          {name}
        </Heading>
        <Text fontStyle="italic" fontSize="xs">
          {description}
        </Text>
      </Box>
      {cardIcon(name)}
    </Box>
  );
};

DashboardCard.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  value: PropTypes.number,
};

const Dashboard = () => {
  const cardStyles = [
    {
      name: "Hospital",
      description: "Total registered hospital.",
      value: 56,
    },
    {
      name: "Doctor",
      description: "Total Doctor",
      value: 56,
    },
    {
      name: "Specialization",
      description: "Total Specialization",
      value: 56,
    },
    {
      name: "Case",
      description: "Total Case",
      value: 56,
    },
  ];

  return (
    <Box w="100%" h="100%" p={5} pt={10}>
      <Flex gap={5}>
        {cardStyles.map((value, index) => (
          <DashboardCard key={index} {...value} />
        ))}
      </Flex>
      <Box w="100%" display="flex" gap={5} mt={10}>
        <Box
          w="100%"
          h="100%"
          p={5}
          bg="white"
          boxShadow="md"
          borderRadius={10}
          flex={9}
        >
          <BarChartComponent />
        </Box>
        <Box flex={3}>
          <PendingCase />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
