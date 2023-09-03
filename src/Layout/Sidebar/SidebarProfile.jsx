import { useState } from "react";
import { Avatar, Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import useUserHook from "../../Hooks/useUserHook";
import useThemeHook from "../../Hooks/useThemeHook";
import { useNavigate } from "react-router-dom";
import male from "../../assets/male_default_profile.jpg";

const SidebarProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user, signOut } = useUserHook();
  const { fontColor } = useThemeHook();

  function handleSignOut(e) {
    e.preventDefault();
    setLoading(true);
    signOut((status, feedback) => {
      switch (status) {
        case 200:
          console.log(feedback);
          navigate("/");
          break;
        default:
          console.log(feedback);
      }
      setLoading(false);
    });
  }

  return (
    <Box w="100%" h="13rem" mb="2rem" p={5}>
      <Flex display="flex" gap={5}>
        <Avatar src={male} name={user.name} size="md" boxShadow="md" />
        <Box>
          <Heading size="sm" color={fontColor}>
            {`${user.name}`}
          </Heading>
          {user.skill === null ? (
            <Text color={fontColor} fontSize={12} fontWeight={400}>
              {user.skills}
            </Text>
          ) : null}
          <Text color={fontColor} fontSize={11} fontWeight={400}>
            {user.hospital}
          </Text>
        </Box>
      </Flex>
      <Button
        w="100%"
        bg="red"
        h="35px"
        isLoading={loading}
        loadingText="Signing out"
        p={2}
        rounded={25}
        opacity={0.7}
        mt={10}
        _hover={{ opacity: 1 }}
        onClick={(e) => handleSignOut(e)}
      >
        <Text color="white" fontSize={14} fontWeight="thin">
          Sign Out
        </Text>
      </Button>
    </Box>
  );
};

export default SidebarProfile;
