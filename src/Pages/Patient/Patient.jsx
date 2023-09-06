import axios from "axios";
import { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Divider,
  Heading,
  Flex,
  Wrap,
  Select,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { BsFillArchiveFill } from "react-icons/bs";
import usePatientHook from "../../Hooks/PatientHook";
import { MdAddCircle } from "react-icons/md";
import male from "../../assets/male_default_profile.jpg";
import female from "../../assets/female_default_profile.jpg";
import Swal from "sweetalert2";
import moment from "moment";
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

const PatientCard = ({ name, contact, birthday, gender, onClick }) => {
  return (
    <Box p={0} boxShadow="md" borderRadius={10} bg="white" overflow="hidden">
      <Center bg="blackAlpha.100" p={5} pb={2}>
        <Avatar
          src={gender === "MALE" ? male : female}
          name={name}
          size="2xl"
        />
      </Center>
      <Box mt={5} fontSize={13} p={5} pt={0}>
        <Heading size="sm">{name}</Heading>
        <Text mt={2}>CONTACT: {contact}</Text>
        <Text>
          AGE: {moment().diff(moment(birthday), "years")} {`(${birthday})`}
        </Text>
        <Flex mt={5} justifyContent="space-between" gap={5} alignItems="center">
          <Button
            size="xs"
            bg={"orange"}
            _hover={{ bg: "orange" }}
            color="white"
            leftIcon={<BsFillArchiveFill />}
            onClick={() => onClick()}
          >
            Update
          </Button>

          <Button
            size="xs"
            bg={"teal"}
            _hover={{ bg: "teal" }}
            color="white"
            leftIcon={<BsFillArchiveFill />}
            onClick={() => onClick()}
          >
            Delete
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

PatientCard.propTypes = {
  name: PropTypes.string,
  contact: PropTypes.string,
  birthday: PropTypes.string,
  gender: PropTypes.string,
  onClick: PropTypes.func,
};

const PatientCardSkeleton = () => {
  return (
    <Box
      w="19rem"
      p={0}
      boxShadow="md"
      borderRadius={10}
      bg="white"
      overflow="hidden"
    >
      <Center bg="blackAlpha.100" p={5} pb={2}>
        <Avatar src={male} name={""} size="2xl" />
      </Center>
      <Box mt={5} fontSize={13} p={5} pt={0}>
        <Skeleton h="1.5rem" mb={2} />
        <Skeleton h=".7rem" mb={2} />
        <Skeleton h=".7rem" mb={2} />
        <Skeleton h=".7rem" mb={2} />
        <Flex mt={5} justifyContent="space-between" gap={5} alignItems="center">
          <Skeleton h="1.2rem" />
          <Skeleton h="1.2rem" />
        </Flex>
      </Box>
    </Box>
  );
};

const Patient = () => {
  const REGISTER_HOSPITAL = "Register Patient";
  const UPDATE_HOSPITAL = "Update Patient";

  const filterOptions = ["All", "Pending", "De-Activated"];

  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(1);

  const { patients, getPatient } = usePatientHook();

  const cardStyles = [
    {
      title: "Pending",
      value: 5,
    },
    {
      title: "De-Activated",
      value: 2,
    },
    {
      title: "Active",
      value: 108,
    },
  ];

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    getPatient(cancelToken.token, (status, feedback) => {
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

    return () => cancelToken.cancel();
  }, []);

  if (loading) {
    return (
      <Box w="100%" h="100%">
        <Wrap p={7} spacing="2.2rem">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
            <PatientCardSkeleton key={index} />
          ))}
        </Wrap>
      </Box>
    );
  }

  if (!loading && patients.length === 0) {
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
            onClick={() => console.log("click")}
          >
            Add Patient
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
        {patients.map((patient) => (
          <PatientCard key={patient.id} {...patient} />
        ))}
      </Wrap>
    </Box>
  );
};

export default Patient;
