import { Avatar, Box, Flex, Heading, Text } from "@chakra-ui/react";
import useProfile from "../../Hooks/Profile.Hook";
import PropTypes from "prop-types";

function getInfo(title, profile) {
  switch (title) {
    case "name":
      return `${profile.position == "Doctor" ? "Dr." : "Nrs."} ${
        profile.firstname
      } ${profile.middlename[0]}. ${profile.lastname}`;
    case "sex":
      return profile.sex;
    case "birthday":
      return profile.birthday;
    case "contact":
      return profile.contact;
    case "specialization":
      return profile.specialization;
    case "hospital":
      return profile.hospital;
    default:
      return "No Data found.";
  }
}

const Information = ({ title, info }) => {
  return (
    <Text fontSize={13} color="gray">
      <Heading size="sm" color="black">
        {info}
      </Heading>
      {title}
    </Text>
  );
};

Information.propTypes = {
  title: PropTypes.string,
  info: PropTypes.string,
};

const ProfileDetails = () => {
  const { profile } = useProfile();

  return (
    <Flex
      w="inherit"
      h="20%"
      alignItems="center"
      pl={10}
      pr={10}
      columnGap={10}
    >
      <Avatar
        name={profile.firstname}
        src={profile.profile}
        size="2xl"
        color="gray"
        boxShadow="lg"
        p={1}
        loading="lazy"
      />
      <Box w="100%" h="40%">
        <Flex flexWrap="wrap" columnGap={10} rowGap={5}>
          <Information title="Name" info={getInfo("name", profile)} />
          <Information title="Sex" info={getInfo("sex", profile)} />
          <Information title="Birthday" info={getInfo("birthday", profile)} />
          <Information title="Contact" info={getInfo("contact", profile)} />
          <Information
            title="Specialization"
            info={getInfo("specialization", profile)}
          />
          <Information title="Hospital" info={getInfo("hospital", profile)} />
        </Flex>
      </Box>
    </Flex>
  );
};

export default ProfileDetails;
