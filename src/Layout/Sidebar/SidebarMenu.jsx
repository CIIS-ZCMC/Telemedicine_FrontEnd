import { useState } from "react";
import { Box, Center, Flex, Text } from "@chakra-ui/react";
import useThemeHook from "../../Hooks/useThemeHook";
import useUserHook from "../../Hooks/useUserHook";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const SidebarMenuItem = ({
  icon,
  label,
  path,
  isActive,
  hasBadge,
  badgeValue,
  onClick,
}) => {
  return (
    <Flex
      h="2.5rem"
      cursor="pointer"
      bg={isActive ? "#00808041" : "transparent"}
      color={isActive ? "teal" : "blackAlpha.700"}
      fontSize={isActive ? 17 : 16}
      pl={5}
      pr={5}
      justifyContent="space-between"
      alignItems="center"
      _hover={{
        color: "teal",
        fontSize: 17,
        transition: "0.1s ease-out",
        "#dashboard-icon": {
          fontSize: 18,
        },
      }}
      onClick={() => onClick(path, label)}
    >
      <Flex gap={3} alignItems="center">
        {icon} <Text>{label}</Text>
      </Flex>
      {hasBadge ? (
        <Box>
          <Box
            w="1.2rem"
            h="1.2rem"
            borderRadius={25}
            bg="red"
            color="white"
            boxShadow="md"
            pt={1.35}
          >
            <Center>
              <Text fontSize={10} fontWeight={800}>
                {badgeValue}
              </Text>
            </Center>
          </Box>
        </Box>
      ) : null}
    </Flex>
  );
};

SidebarMenuItem.propTypes = {
  icon: PropTypes.object,
  label: PropTypes.string,
  path: PropTypes.string,
  isActive: PropTypes.number,
  hasBadge: PropTypes.bool,
  badgeValue: PropTypes.number,
  onClick: PropTypes.func,
};

const SidebarMenu = () => {
  const navigate = useNavigate();

  const [selected, setSelected] = useState(0);
  const { setPage, getFilteredRoutes } = useThemeHook();
  const { user } = useUserHook();

  return (
    <Box w="inherit" p={0}>
      {getFilteredRoutes(user?.role).map((route, index) => (
        <SidebarMenuItem
          key={index}
          {...route}
          isActive={index === selected}
          onClick={(path, label) => {
            navigate(path);
            setPage(label);
            setSelected(index);
          }}
        />
      ))}
    </Box>
  );
};

export default SidebarMenu;
