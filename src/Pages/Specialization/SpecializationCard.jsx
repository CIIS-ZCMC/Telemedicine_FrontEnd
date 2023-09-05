import { Badge, Box, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import moment from "moment";
import {AiFillEdit} from 'react-icons/ai'
import {MdDelete} from 'react-icons/md'
import PropTypes from "prop-types";

const SpecializationCard = ({ id, name, description, date, status, onUpdate, onDelete }) => {
  return (
    <Flex key={id} w="20rem" bg='white' flexDirection='column' justifyContent='space-between' borderRadius={10} boxShadow="lg" p={5} overflow='hidden'>
      <Heading size="md">{name}</Heading>
      <Box mt={3} h="3rem" overflowWrap="break-word" fontSize={13} 
        overflow='hidden'>
        <Text>{description}</Text>
      </Box>
      <Flex justifyContent='space-between' alignItems='center' p={2}>
        <Flex alignItems="center" justifyContent="space-between">
          <Text fontSize={12}>{moment(date).format("MMMM D, YYYY")}</Text>
          <Badge color="teal">{status} </Badge>
        </Flex>
        <Flex justifyContent='end' gap={5}>
          <IconButton size='sm' bg='orange' color='white'  icon={<AiFillEdit />} onClick={(e) => onUpdate(e, id, name, description, status)}   />
          <IconButton size='sm' bg='red' color='white' icon={<MdDelete />} onClick={(e) => onDelete(e, id)} />
        </Flex>
      </Flex>
    </Flex>
  );
};

SpecializationCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.object,
  status: PropTypes.string,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
};

export default SpecializationCard;
