import { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Divider,
  Heading,
  Flex,
  Wrap,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import ModalComponent from "../../Components/ModalComponent/ModalComponent";
import useHospitalHooks from "../../Hooks/useHospitalHook";
import HospitalCardSkeleton from "./HospitalCardSkeleton";
import HospitalCard from "./HospitalCard";
import InputCalendarComponent from "../Calendar/InputCalendarComponent";
import { MdAddCircle } from "react-icons/md";
import PropTypes from "prop-types";

const Card = ({ title, value, hasDivider }) => {
  return (
    <>
      <Badge
        display="flex"
        gap={5}
        alignItems="center"
        p={2}
        pl={5}
        pr={5}
        bg="transparent"
      >
        <Heading size="sm" color="blackAlpha.800">
          {value}
        </Heading>
        <Heading size="xs" color="blackAlpha.700">
          {title}
        </Heading>
      </Badge>
      {hasDivider ? (
        <Divider borderLeft="1px solid gray" width={0} height={4} />
      ) : null}
    </>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number,
  hasDivider: PropTypes.bool,
};

const Hospital = () => {
  const REGISTER_USER = "Register User";
  const USER_STATUS = "User Status";

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { hospitals, getHospital } = useHospitalHooks();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(1);

  const [title, setTitle] = useState("Register User");

  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [barangay, setBarangay] = useState("");
  const [city, setCity] = useState("");

  const filterOptions = ["All", "Active", "In-Active"];

  const formStyle = [
    {
      label: "Name",
      placeholder: "Enter hospital name",
      type: "text",
      value: name,
      setValue: setName,
      mt: 4,
    },
    {
      label: "Street",
      placeholder: "Enter street",
      type: "text",
      value: street,
      setValue: setStreet,
      mt: 4,
    },
    {
      label: "Barangay",
      placeholder: "Enter barangay",
      type: "text",
      value: barangay,
      setValue: setBarangay,
      mt: 4,
    },
    {
      label: "City",
      placeholder: "Enter city",
      type: "text",
      value: city,
      setValue: setCity,
      mt: 4,
    },
  ];

  const cardStyles = [
    {
      title: "Total",
      value: 25,
    },
    {
      title: "Active",
      value: 18,
    },
    {
      title: "In-Active",
      value: 7,
    },
  ];

  function initializeRegisterForm() {
    setTitle(REGISTER_USER);
    onOpen();
  }

  useEffect(() => {
    getHospital((status, feedback) => {
      switch (status) {
        case 200:
          console.log(feedback);
          break;
        default:
          console.log(feedback);
          break;
      }
      setLoading(false);
    });
  }, []);

  function closeModal() {
    onClose();
  }

  if (loading) {
    return (
      <Box w="100%" h="100%">
        <Wrap p={7} spacing="2.2rem">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
            <HospitalCardSkeleton key={index} />
          ))}
        </Wrap>
      </Box>
    );
  }

  if (!loading && hospitals.length === 0) {
    return (
      <Box w="100%" h="100%">
        No Record.
      </Box>
    );
  }

  return (
    <Box w="100%" h="100%" p={5}>
      <Flex
        w="100%"
        h="5rem"
        p={5}
        rounded={8}
        boxShadow="md"
        bg="white"
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex gap={14} alignItems="center">
          <Heading size="md" color="teal">
            Summary Record
          </Heading>
          <Flex gap={2} alignItems="center">
            {cardStyles.map((value, index) => (
              <Card
                key={index}
                {...value}
                hasDivider={index < cardStyles.length - 1}
              />
            ))}
          </Flex>
        </Flex>
        <Flex gap={5} alignItems="center">
          <Button
            bg="teal"
            color="white"
            leftIcon={<MdAddCircle size={24} />}
            size="sm"
            _hover={{ bg: "teal" }}
            onClick={() => initializeRegisterForm()}
          >
            Add Hospital
          </Button>
          <Box w="10rem">
            <Select
              size="sm"
              variant="filled"
              focusBorderColor="teal"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              {filterOptions.map((value, index) => (
                <option key={index} value={index}>
                  {value}
                </option>
              ))}
            </Select>
          </Box>
        </Flex>
      </Flex>
      <Wrap p={7} pl={0} pr={0} spacing="2.2rem">
        {hospitals.map((hospital, index) => (
          <HospitalCard key={index} {...hospital} />
        ))}
      </Wrap>
      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        title={title}
        footer={
          <Flex gap={5}>
            <Button size="sm" onClick={() => closeModal()}>
              Cancel
            </Button>
            <Button
              size="sm"
              bg={"teal"}
              color="white"
              onClick={() => console.log("click me")}
            >
              Save
            </Button>
          </Flex>
        }
      >
        {title === USER_STATUS ? (
          <Text> {"You're about to approved this account."} </Text>
        ) : (
          <Box>
            {formStyle.map((value, index) => (
              <InputCalendarComponent key={index} {...value} />
            ))}
          </Box>
        )}
      </ModalComponent>
    </Box>
  );
};

export default Hospital;
