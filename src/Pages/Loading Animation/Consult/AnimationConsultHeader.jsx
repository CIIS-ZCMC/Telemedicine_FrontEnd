import { Box, Button, IconButton, Menu, MenuButton } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { IoArrowBackOutline } from "react-icons/io5";
import "../../../Style/Consult.css";

const AnimationConsultHeader = () => {
  return (
    <Box
      w="inherit"
      h="3.5rem"
      bg="white"
      pl={5}
      pr={5}
      pt={1}
      zIndex={99}
      display="flex"
      columnGap={5}
      justifyContent="space-between"
      alignItems="center"
      boxShadow={"md"}
    >
      <IconButton
        size="lg"
        bg="white"
        icon={<IoArrowBackOutline fontSize={25} />}
        rounded={25}
        _hover={{ color: "green", boxShadow: "lg" }}
      />

      <Box fontWeight={800} display="flex" columnGap={5} alignItems="center">
        <Box className="selection-list">
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              fontSize={14}
            >
              ACTIONS
            </MenuButton>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default AnimationConsultHeader;
