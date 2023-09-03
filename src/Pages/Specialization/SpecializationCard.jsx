import { Badge, Box, Flex, Heading, Text } from "@chakra-ui/react";
import moment from "moment";
import PropTypes from "prop-types";

const SpecializationCard = ({ id, name, description, date, status }) => {
  return (
    <Box key={id} w="20rem" borderRadius={10} boxShadow="lg" p={5}>
      <Heading size="md">{name}</Heading>
      <Box mt={3} h="2rem" overflowWrap="break-word" fontSize={13} mb={5}>
        <Text>{description}</Text>
      </Box>
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize={12}>{moment(date).format("MMMM D, YYYY")}</Text>
        <Badge color="teal">{status} </Badge>
      </Flex>
    </Box>
  );
};

SpecializationCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.object,
  status: PropTypes.string,
};

export default SpecializationCard;
