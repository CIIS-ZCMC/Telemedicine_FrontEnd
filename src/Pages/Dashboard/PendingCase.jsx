import { Avatar, Box, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import moment from "moment";
import { FixedSizeList as List } from "react-window";
import { FaBriefcaseMedical } from "react-icons/fa";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import { PendingCaseData } from "../../Data/PendingCaseData";
import BadgeIconButton from "./BadgeIconButton";
import PropTypes from "prop-types";

const PendingCaseCard = ({ caseNo, patientName, url, hospital, date }) => {
  return (
    <Box pr={2} cursor="pointer">
      <Flex justifyContent="space-between" boxShadow="sm">
        <Text fontSize={12} color="gray" float="right">
          {hospital}
        </Text>
        <Text fontSize={12} color="gray" float="right">
          {moment(date).fromNow()}
        </Text>
      </Flex>
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
        <Avatar src={url} name={patientName} />
        <Box>
          <Text fontSize={12}>CASE NO: {caseNo}</Text>
          <Heading size="sm">{patientName}</Heading>
        </Box>
      </Flex>
    </Box>
  );
};

PendingCaseCard.propTypes = {
  caseNo: PropTypes.string,
  patientName: PropTypes.string,
  url: PropTypes.string,
  hospital: PropTypes.string,
  date: PropTypes.object,
};

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

const PendingCase = () => {
  const [ascending, setAscending] = useState(true);
  const [pendingCase, setPendingCase] = useState([]);

  const sort = () => [
    ...pendingCase.sort((a, b) =>
      ascending ? b.date - a.date : a.date - b.date
    ),
  ];

  const Row = ({ index, style }) => {
    const value = sort()[index];

    return (
      <div style={style}>
        <PendingCaseCard key={index} {...value} />
      </div>
    );
  };

  Row.propTypes = {
    index: PropTypes.number,
    style: PropTypes.object,
  };

  const badgeStyle = {
    value: pendingCase.length,
    btnColor: "blackAlpha.700",
    btnBgColor: "teal",
    hoverColor: "red",
  };

  useEffect(() => {
    setPendingCase(PendingCaseData);
  }, []);

  return (
    <Box
      w="100%"
      h="100%"
      bg="white"
      borderRadius={12}
      boxShadow="md"
      p={5}
      pt={2}
      pr={0}
    >
      <Flex alignItems="center" justifyContent="space-between" mb={3}>
        <Flex alignItems="center" gap={2}>
          <Heading size="md" color="blackAlpha.700">
            Pending Cases
          </Heading>
          <BadgeIconButton {...badgeStyle}>
            <FaBriefcaseMedical size={22} />
          </BadgeIconButton>
        </Flex>
        <SortComponent
          isSort={ascending}
          onClick={() => setAscending(!ascending)}
        />
      </Flex>
      <List height={380} itemCount={sort().length} itemSize={90} width="22rem">
        {Row}
      </List>
    </Box>
  );
};

export default PendingCase;
