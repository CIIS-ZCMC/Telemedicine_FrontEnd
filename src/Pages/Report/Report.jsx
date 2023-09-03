import { useState } from "react";
import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import moment from "moment";
import { MdAddCircle } from "react-icons/md";
import { IoCloudDownloadSharp } from "react-icons/io5";
import ModalComponent from "../../Components/ModalComponent/ModalComponent";
import InputCalendarComponent from "../Calendar/InputCalendarComponent";
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

const Report = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filter, setFilter] = useState(1);
  const [specialization, setSpecialization] = useState(null);
  const [date, setDate] = useState(null);

  const filterOptions = ["All", "General Report"];

  const reportsData = [
    {
      id: 1,
      name: "General Report",
    },
    {
      id: 2,
      name: "Specialization",
    },
    {
      id: 3,
      name: "Hospital",
    },
    {
      id: 4,
      name: "Total User",
    },
  ];

  const specializationData = [
    {
      id: 1,
      name: "Internal Medicine",
    },
    {
      id: 1,
      name: "Pediatric",
    },
    {
      id: 1,
      name: "Surgery",
    },
    {
      id: 1,
      name: "OB",
    },
  ];

  const dateForm = {
    label: "Date",
    placeholder: "Enter date",
    type: "date",
    value: date,
    setValue: setDate,
    mt: 4,
  };

  const styles = [
    {
      id: 1,
      name: "General Reports",
      downloads: 12,
      user: "Dr. Zayn Malik",
      date: "2023-08-31",
      action: true,
    },
    {
      id: 2,
      name: "General Reports",
      downloads: 12,
      user: "Dr. Zayn Malik",
      date: "2023-08-31",
      action: true,
    },
    {
      id: 3,
      name: "General Reports",
      downloads: 12,
      user: "Dr. Zayn Malik",
      date: "2023-08-31",
      action: true,
    },
    {
      id: 4,
      name: "General Reports",
      downloads: 12,
      user: "Dr. Zayn Malik",
      date: "2023-08-31",
      action: true,
    },
    {
      id: 5,
      name: "General Reports",
      downloads: 12,
      user: "Dr. Zayn Malik",
      date: "2023-08-31",
      action: true,
    },
    {
      id: 6,
      name: "General Reports",
      downloads: 12,
      user: "Dr. Zayn Malik",
      date: "2023-08-31",
      action: true,
    },
    {
      id: 7,
      name: "General Reports",
      downloads: 12,
      user: "Dr. Zayn Malik",
      date: "2023-08-31",
      action: true,
    },
    {
      id: 8,
      name: "General Reports",
      downloads: 12,
      user: "Dr. Zayn Malik",
      date: "2023-08-31",
      action: true,
    },
  ];

  const column = [
    {
      id: 1,
      header: "ID",
    },
    {
      id: 2,
      header: "Name",
    },
    {
      id: 3,
      header: "User",
    },
    {
      id: 4,
      header: "Downloads",
    },
    {
      id: 5,
      header: "Date",
    },
    {
      id: 6,
      header: "Action",
    },
  ];

  const cardStyles = [
    {
      title: "Total",
      value: 502,
    },
    {
      title: "Downloads",
      value: 125,
    },
  ];

  return (
    <Box p={5} pt={0} mt={5}>
      <Box w="100%" h="100%" p={5} bg="white" rounded={10} boxShadow="md">
        <Flex mb={10} justifyContent="space-between">
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
          <Flex alignItems="center" gap={5}>
            <Button
              bg="teal"
              color="white"
              leftIcon={<MdAddCircle size={24} />}
              size="sm"
              _hover={{ bg: "teal" }}
              onClick={() => onOpen()}
            >
              Create Report
            </Button>
            <Box w="13rem">
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
        <TableContainer>
          <Table variant="striped">
            <TableCaption>Telemedicine Transaction Logs </TableCaption>
            <Thead>
              <Tr>
                {column.map((value) => (
                  <Th key={value.id}>{value.header} </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {styles.map(({ id, name, downloads, user, date, action }) => (
                <Tr key={id}>
                  <Td>{id} </Td>
                  <Td>{name} </Td>
                  <Td>{user} </Td>
                  <Td>{downloads} </Td>
                  <Td>{moment(date).format("LL")} </Td>
                  {action === null ? null : (
                    <Td>
                      <Button
                        bg="darkorange"
                        color="white"
                        size="sm"
                        _hover={{
                          bg: "darkorange",
                          transform: "scale(1.1, 1.1)",
                        }}
                        leftIcon={<IoCloudDownloadSharp />}
                        onClick={() => console.log("click me")}
                      >
                        Download
                      </Button>
                    </Td>
                  )}
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                {column.map((value) => (
                  <Th key={value.id}>{value.header} </Th>
                ))}
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        title={"Generate Report"}
        footer={
          <Flex gap={5}>
            <Button size="sm" onClick={() => onClose()}>
              Cancel
            </Button>
            <Button
              size="sm"
              bg={"teal"}
              color="white"
              onClick={() => console.log("click me")}
            >
              Generate
            </Button>
          </Flex>
        }
      >
        <Box>
          <Select
            size="md"
            variant="filled"
            focusBorderColor="teal"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {reportsData.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </Select>

          <InputCalendarComponent {...dateForm} />
          <Box mt={5}>
            <Text>Specialization</Text>
            <Select
              size="md"
              variant="filled"
              focusBorderColor="teal"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            >
              {specializationData.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Select>
          </Box>
        </Box>
      </ModalComponent>
    </Box>
  );
};

export default Report;
