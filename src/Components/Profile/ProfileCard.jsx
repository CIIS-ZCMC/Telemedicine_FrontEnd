import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { BsFillArchiveFill } from "react-icons/bs";
import male from "../../assets/male_default_profile.jpg";
// import female from "../../assets/female_default_profile.jpg";
import PropTypes from "prop-types";

const ProfileCard = ({
  name,
  specialization,
  hospital,
  status,
  url,
  onClick,
}) => {
  return (
    <Box p={0} boxShadow="md" borderRadius={10} bg="white" overflow="hidden">
      <Center bg="blackAlpha.100" p={5} pb={2}>
        <Avatar src={url === null ? male : url} name={name} size="2xl" />
      </Center>
      <Box mt={5} fontSize={13} p={5} pt={0}>
        <Heading size="sm">{name}</Heading>
        <Text mt={2}>{specialization}</Text>
        <Text>{hospital}</Text>
        <Flex mt={5} justifyContent="space-between" gap={5} alignItems="center">
          <Box>
            <Badge color="teal">{status}</Badge>
          </Box>

          <Button
            size="xs"
            bg={status === "Approved" ? "orange" : "teal"}
            _hover={{ bg: status === "Approved" ? "orange" : "teal" }}
            color="white"
            leftIcon={
              status === "Approved" ? (
                <BsFillArchiveFill />
              ) : (
                <BsFillArchiveFill />
              )
            }
            onClick={() => onClick()}
          >
            {status === "Approved" ? "De-Activate" : "Approve"}
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

ProfileCard.propTypes = {
  name: PropTypes.string,
  specialization: PropTypes.string,
  hospital: PropTypes.string,
  status: PropTypes.string,
  url: PropTypes.string,
  onClick: PropTypes.func,
};

export default ProfileCard;
