import {
  Box,
  Flex,
  Divider,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoArrowForwardOutline } from "react-icons/io5";
import useThemeHook from "../../Hooks/useThemeHook";

const SidebarDateTime = () => {
  const { fontColor } = useThemeHook();
  const navigate = useNavigate();
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function initilizeComponent() {
    const currentDate = new Date();

    const currentMonth = currentDate.toLocaleString("default", {
      day: "numeric",
      month: "short",
    });

    const splitCurrentMonth = currentMonth.split(" ");

    setDay(daysOfWeek[currentDate.getDay()]);
    setMonth(`${splitCurrentMonth[1]} ${splitCurrentMonth[0]}`);
    setYear(currentDate.getFullYear());
  }

  useEffect(() => {
    initilizeComponent();
  }, []);

  return (
    <Flex flexDirection="column" p={7} pb={0} gap={5} borderColor="gray.300">
      <Divider borderWidth={1} />
      <Box color="gray">
        <Text fontSize={14}>{day}</Text>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading color={fontColor} fontWeight={400} size="lg">
            {month}
          </Heading>
          <IconButton
            icon={<IoArrowForwardOutline size={24} />}
            rounded={25}
            color={fontColor}
            bg="transparent"
            onClick={() => navigate("/my-calendar")}
          />
        </Flex>
        <Text fontSize={14}>{year}</Text>
      </Box>
      <Divider borderWidth={1} />
    </Flex>
  );
};

export default SidebarDateTime;
