import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const StatisticData = [
  {
    id: 1,
    month: "January",
    caseTot: 25,
    patient: 25,
  },
  {
    id: 2,
    month: "February",
    caseTot: 50,
    patient: 45,
  },
  {
    id: 3,
    month: "March",
    caseTot: 75,
    patient: 70,
  },
  {
    id: 4,
    month: "April",
    caseTot: 100,
    patient: 80,
  },
  {
    id: 5,
    month: "May",
    caseTot: 125,
    patient: 110,
  },
  {
    id: 6,
    month: "June",
    caseTot: 25,
    patient: 12,
  },
  {
    id: 7,
    month: "July",
    caseTot: 75,
    patient: 60,
  },
  {
    id: 8,
    month: "August",
    caseTot: 202,
    patient: 70,
  },
  {
    id: 9,
    month: "September",
    caseTot: 110,
    patient: 509,
  },
  {
    id: 10,
    month: "October",
    caseTot: 20,
    patient: 18,
  },
  {
    id: 11,
    month: "November",
    caseTot: 200,
    patient: 30,
  },
  {
    id: 12,
    month: "December",
    caseTot: 245,
    patient: 50,
  },
];

const TableRow = ({ id, month, caseTot, patient }) => {
  return (
    <Tr>
      <Td>{id}</Td>
      <Td>{month}</Td>
      <Td isNumeric>{caseTot}</Td>
      <Td isNumeric>{patient}</Td>
    </Tr>
  );
};

TableRow.propTypes = {
  id: PropTypes.number,
  month: PropTypes.string,
  caseTot: PropTypes.number,
  patient: PropTypes.number,
};

const StatisticTable = () => {
  return (
    <Box h="inherit">
      <TableContainer height="22rem" overflowY={"scroll"}>
        <Table variant="simple">
          <TableCaption>Monthly Case and Patient Record</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Month</Th>
              <Th isNumeric>Case</Th>
              <Th isNumeric>Patient</Th>
            </Tr>
          </Thead>
          <Tbody>
            {StatisticData.map((value) => (
              <TableRow key={value.id} {...value} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StatisticTable;
