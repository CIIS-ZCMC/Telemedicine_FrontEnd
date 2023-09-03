import { useState } from "react";
import {
  Badge,
  Box,
  Divider,
  Flex,
  Heading,
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
} from "@chakra-ui/react";
import moment from "moment";
import { TbSortDescending2, TbSortAscending2 } from "react-icons/tb";
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

const TableHeaderAction = ({ header, sort, onClick }) => {
  const [ascending, setAscending] = useState(true);
  if (sort) {
    return (
      <Th
        cursor="pointer"
        onClick={() => {
          onClick();
          setAscending(!ascending);
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          {header}
          {ascending ? (
            <TbSortAscending2 size={17} />
          ) : (
            <TbSortDescending2 size={17} />
          )}
        </Box>
      </Th>
    );
  }

  return <Th>{header}</Th>;
};

TableHeaderAction.propTypes = {
  header: PropTypes.string,
  sort: PropTypes.bool,
  onClick: PropTypes.func,
};

const History = () => {
  const [filter, setFilter] = useState(0);
  const [selectedColumn, setSelectedColumn] = useState(0);

  const filterOptions = [
    {
      id: 1,
      name: "All",
    },
    {
      id: 2,
      name: "Descending",
    },
    {
      id: 3,
      name: "Post",
    },
    {
      id: 4,
      name: "Update",
    },
    {
      id: 5,
      name: "Delete",
    },
  ];

  const styles = [
    {
      id: 1,
      value: "Hospital",
      action: "POST",
      user: "Dr. Zayn Malik",
      ip: "192.168.38.132",
      date: "2023-08-21",
    },
    {
      id: 2,
      value: "Hospital",
      action: "POST",
      user: "Dr. Zayn Malik",
      ip: "192.168.38.132",
      date: "2023-08-31",
    },
    {
      id: 3,
      value: "Hospital",
      action: "DELETE",
      user: "Dr. Zayn Malik",
      ip: "192.168.38.132",
      date: "2023-08-31",
    },
    {
      id: 4,
      value: "Hospital",
      action: "DELETE",
      user: "Dr. Zayn Malik",
      ip: "192.168.38.132",
      date: "2023-08-12",
    },
    {
      id: 5,
      value: "Hospital",
      action: "DELETE",
      user: "Dr. Zayn Malik",
      ip: "192.168.38.132",
      date: "2023-08-31",
    },
    {
      id: 6,
      value: "Hospital",
      action: "POST",
      user: "Dr. Zayn Malik",
      ip: "192.168.38.132",
      date: "2023-08-11",
    },
    {
      id: 7,
      value: "Hospital",
      action: "UPDATE",
      user: "Dr. Zayn Malik",
      ip: "192.168.38.132",
      date: "2023-08-31",
    },
    {
      id: 8,
      value: "Hospital",
      action: "UPDATE",
      user: "Dr. Zayn Malik",
      ip: "192.168.38.132",
      date: "2023-08-31",
    },
  ];

  const column = [
    {
      id: 0,
      header: "ID",
      name: "id",
      type: "number",
      sort: false,
    },
    {
      id: 1,
      header: "Table",
      name: "value",
      type: "text",
      sort: true,
    },
    {
      id: 2,
      header: "Action",
      name: "action",
      type: "action",
      sort: false,
    },
    {
      id: 3,
      header: "User",
      name: "user",
      type: "text",
      sort: true,
    },
    {
      id: 4,
      header: "IP ADDRESS",
      name: "ip",
      type: "text",
      sort: false,
    },
    {
      id: 5,
      header: "Date",
      name: "date",
      type: "date",
      sort: true,
    },
  ];

  const cardStyles = [
    {
      title: "TRANSACTIONS",
      value: 1020,
    },
    {
      title: "POST",
      value: 5,
    },
    {
      title: "UPDATE",
      value: 2,
    },
    {
      title: "DELETE",
      value: 108,
    },
  ];

  const sort = () =>
    filter > 2
      ? [
          ...styles.filter((value) =>
            value.action
              .toLocaleLowerCase()
              .includes(filterOptions[filter - 1].name.toLocaleLowerCase())
          ),
        ]
      : styles;

  const sorting = () => {
    const columnValue = column[selectedColumn];

    switch (columnValue.type) {
      case "text":
        return [
          ...sort().sort((a, b) => b[columnValue.name] - a[columnValue.name]),
        ];
      case "number":
        return [
          ...sort().sort((a, b) => b[columnValue.name] - a[columnValue.name]),
        ];
      case "date":
        return [
          ...sort().sort(
            (a, b) =>
              new Date(b[columnValue.name]) - new Date(a[columnValue.name])
          ),
        ];
      default:
        return sort();
    }
  };

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
          <Box w="10rem">
            <Select
              size="sm"
              variant="filled"
              focusBorderColor="teal"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              {filterOptions.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Select>
          </Box>
        </Flex>
        <TableContainer>
          <Table variant="striped">
            <TableCaption>Telemedicine Transaction Logs </TableCaption>
            <Thead>
              <Tr>
                {column.map((value) => (
                  <TableHeaderAction
                    key={value.id}
                    {...value}
                    onClick={() => setSelectedColumn(value.id)}
                  />
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {sorting().map(({ id, value, action, user, ip, date }) => (
                <Tr key={id}>
                  <Td>{id} </Td>
                  <Td>{value} </Td>
                  <Td>{action} </Td>
                  <Td>{user} </Td>
                  <Td>{ip} </Td>
                  <Td>{moment(date).format("LL")} </Td>
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
    </Box>
  );
};

export default History;
