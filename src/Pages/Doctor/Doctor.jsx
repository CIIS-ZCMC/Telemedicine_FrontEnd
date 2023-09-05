import axios from "axios";
import { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Text,
  Wrap,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import useDoctorHook from "../../Hooks/useDoctorHook";
import ModalComponent from "../../Components/ModalComponent/ModalComponent";
import ProfileCard from "../../Components/Profile/ProfileCard";
import ProfileCardSkeleton from "../../Components/Profile/ProfileCardSkeleton";
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

const Doctor = () => {
  const REGISTER_USER = "Register User";
  const USER_STATUS = "User Status";
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [doctor, setDoctor] = useState(null);
  const { doctors, getDoctors } = useDoctorHook();
  const [filter, setFilter] = useState(1);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("Register User");

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");

  const filterOptions = ["All", "Pending", "De-Activated"];

  const formStyle = [
    {
      label: "First name",
      placeholder: "Enter first name",
      type: "text",
      value: firstName,
      setValue: setFirstName,
      mt: 4,
    },
    {
      label: "Middle name",
      placeholder: "Enter middle name",
      type: "text",
      value: middleName,
      setValue: setMiddleName,
      mt: 4,
    },
    {
      label: "Last name",
      placeholder: "Enter last name",
      type: "text",
      value: lastName,
      setValue: setLastName,
      mt: 4,
    },
  ];

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

  function intializeCardModal(value) {
    setDoctor(value);
    setTitle(USER_STATUS);
    onOpen();
  }

  function initializeRegisterUserForm() {
    setTitle(REGISTER_USER);
    onOpen();
  }

  function initializeDoctorData(cancelToken) {
    getDoctors(cancelToken, (status, feedBack) => {
      switch (status) {
        case 200:
          console.log("Success");
          break;
        case 401:
          console.log(feedBack);
          break;
        default:
          console.log(feedBack);
      }
      setLoading(false);
    });
  }

  function closeModal() {
    setDoctor(null);
    onClose();
  }

  function registerUser() {
    onClose();
  }

  function handleApproved() {
    //For approval account
  }

  function handleDeActivate() {
    //For deactivation of account
  }

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    if (loading) {
      initializeDoctorData(cancelTokenSource);
    }

    return () => cancelTokenSource.cancel();
  }, []);

  if (loading) {
    return (
      <Box>
        <Wrap p={7} spacing="2.2rem">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
            <ProfileCardSkeleton key={value} />
          ))}
        </Wrap>
      </Box>
    );
  }

  return (
    <Box p={5}>
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
            size="sm"
            leftIcon={<MdAddCircle size={24} />}
            _hover={{ bg: "teal" }}
            onClick={() => initializeRegisterUserForm()}
          >
            Add Navigator
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
        {doctors.map((value, index) => (
          <ProfileCard
            key={index}
            {...value}
            onClick={() => intializeCardModal(value)}
          />
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
              bg={doctor?.status !== "Approved" ? "teal" : "red"}
              color="white"
              onClick={() =>
                title === REGISTER_USER
                  ? registerUser()
                  : doctor?.status === "Approved"
                  ? handleDeActivate()
                  : handleApproved()
              }
            >
              {title === REGISTER_USER
                ? "Save"
                : doctor?.status === "Approved"
                ? "De-Actived"
                : "Approve"}
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

export default Doctor;
