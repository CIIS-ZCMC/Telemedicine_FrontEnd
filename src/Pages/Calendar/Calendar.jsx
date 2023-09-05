import { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import FullCalendar from "@fullcalendar/react";
import { BsCalendarPlusFill } from "react-icons/bs";
import { FixedSizeList as List } from "react-window";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import dayGridPlugin from "@fullcalendar/daygrid";
import InputCalendarComponent from "./InputCalendarComponent";
import ModalComponent from "../../Components/ModalComponent/ModalComponent";
import moment from "moment";
import PropTypes from "prop-types";

const SortComponent = ({ isSort, onClick }) => {
  return (
    <IconButton
      bg="transparent"
      rounded="100%"
      _hover={{ transform: "scale(1.2,1.2)" }}
      onClick={() => onClick()}
    >
      {isSort ? <TbSortAscending size={25} /> : <TbSortDescending size={25} />}
    </IconButton>
  );
};

SortComponent.propTypes = {
  isSort: PropTypes.bool,
  onClick: PropTypes.func,
};

const eventsData = [
  {
    title: "Saga",
    time: "10:00 a.m",
    duration: "2 hrs",
    location: "Ragency",
    date: "2023-8-21",
  },
  {
    title: "Summer Time",
    time: "10:00 a.m",
    duration: "2 hrs",
    location: "Ragency",
    date: "2023-8-8",
  },
  {
    title: "Meeting",
    time: "2:00 a.m",
    duration: "3 hrs",
    location: "Convention Center",
    date: "2023-8-11",
  },
  {
    title: "Summer",
    time: "10:00 a.m",
    duration: "1 hrs",
    location: "Ragency",
    date: "2023-8-12",
  },
];

const Event = ({ title, time, duration, location, date }) => {
  return (
    <Flex
      w="100%"
      bg="gray.100"
      mb={2}
      p={2}
      pl={5}
      borderRadius={10}
      alignItems="center"
      gap={8}
    >
      <Flex w="10rem" alignItems="center" gap={2}>
        <Heading size="md">{moment(date).format("DD")}</Heading>
        <Heading size="xs">{title}</Heading>
      </Flex>
      <Box w="6rem">
        <Text fontSize={12}>{time}</Text>
        <Text fontSize={12}>{duration}</Text>
      </Box>
      <Text fontSize={12}>{location}</Text>
    </Flex>
  );
};

Event.propTypes = {
  title: PropTypes.string,
  time: PropTypes.string,
  duration: PropTypes.string,
  location: PropTypes.string,
  date: PropTypes.object,
};

const Calendar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState(null);
  const [startAt, setStartAt] = useState(null);
  const [endAt, setEndAt] = useState(null);
  const [location, setLocation] = useState("");

  const [ascending, setAscending] = useState(true);
  const [event, setEvent] = useState([]);

  const initialRef = useRef(null);

  const formStyle = [
    {
      label: "Event name",
      placeholder: "Enter event name",
      type: "text",
      value: eventName,
      setValue: setEventName,
      mt: 4,
    },
    {
      label: "Event date",
      placeholder: "Enter event date",
      type: "date",
      value: eventDate,
      setValue: setEventDate,
      mt: 4,
    },
    {
      label: "Start At",
      placeholder: "Enter time start",
      type: "time",
      value: startAt,
      setValue: setStartAt,
      mt: 4,
    },
    {
      label: "End At",
      placeholder: "Enter time end",
      type: "time",
      value: endAt,
      setValue: setEndAt,
      mt: 4,
    },
    {
      label: "Location",
      placeholder: "Enter location name",
      type: "text",
      value: location,
      setValue: setLocation,
      mt: 4,
    },
  ];

  function resetFormStates() {
    setEventName("");
    setEventDate(null);
    setStartAt(null);
    setEndAt(null);
    setLocation("");
  }

  function closeModal(e) {
    e.preventDefault();
    resetFormStates();
    onClose();
  }

  const sort = () => [
    ...eventsData.sort((a, b) =>
      ascending
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    ),
  ];

  const Row = ({ index, style }) => {
    const value = sort()[index];

    return (
      <div style={style}>
        <Event key={index} {...value} />
      </div>
    );
  };

  Row.propTypes = {
    index: PropTypes.number,
    style: PropTypes.object,
  };

  useEffect(() => {
    setEvent(eventsData);
  }, []);

  return (
    <Box w="inherit" height="90%" marginTop={10}>
      <Flex h="100%" p={5} gap={5}>
        <Box
          w="100%"
          flex={10}
          bg="white"
          p={5}
          borderRadius={10}
          boxShadow="md"
          overflow="hidden"
        >
          <FullCalendar
            height="100%"
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={event}
          />
        </Box>
        <Box
          w="100%"
          flex={5}
          p={5}
          bg="white"
          boxShadow="md"
          borderRadius={10}
        >
          <Flex justifyContent="space-between" alignContent="center">
            <Heading size="md" color="blackAlpha.700" mb={10}>
              August Events List
            </Heading>
            <Flex gap={5}>
              <Button
                size="sm"
                bg="teal"
                color="white"
                gap={2}
                onClick={() => onOpen()}
              >
                <BsCalendarPlusFill size={18} /> New Event
              </Button>
              <SortComponent
                isSort={ascending}
                onClick={() => setAscending(!ascending)}
              />
            </Flex>
          </Flex>
          <Flex
            w="100%"
            mb={2}
            p={2}
            pl={5}
            borderRadius={10}
            alignItems="center"
            gap={8}
            fontSize={12}
          >
            <Flex w="10rem" alignItems="center" gap={2}>
              <Text>{"Day & Event".toLocaleUpperCase()}</Text>
            </Flex>
            <Box>
              <Text>{"Time & Duration".toLocaleUpperCase()}</Text>
            </Box>
            <Text>{"Location".toLocaleUpperCase()}</Text>
          </Flex>
          <List
            height={380}
            itemCount={sort().length}
            itemSize={70}
            width="100%"
          >
            {Row}
          </List>
        </Box>
      </Flex>
      <ModalComponent
        title={"Register event"}
        initialRef={initialRef}
        isOpen={isOpen}
        onClose={closeModal}
        footer={
          <Box display="flex" gap={5}>
            <Button onClick={(e) => closeModal(e)}>Cancel</Button>
            <Button bg="teal" color="white">
              Save
            </Button>
          </Box>
        }
      >
        {formStyle.map((value, index) => (
          <InputCalendarComponent key={index} {...value} />
        ))}
      </ModalComponent>
    </Box>
  );
};

export default Calendar;
