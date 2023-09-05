import { Box, Flex } from "@chakra-ui/react";
import SidebarLogo from "./SidebarLogo";
import SidebarProfile from "./SidebarProfile";
import SidebarDateTime from "./SidebarDateTime";
import PropTypes from "prop-types";
import SidebarMenu from "./SidebarMenu";

const FlexColumn = ({ justify, children, remSize }) => {
  return (
    <Flex
      w="100%"
      h="100%"
      flexDirection="column"
      justifyContent={justify}
      gap={`${remSize}rem`}
    >
      {children}
    </Flex>
  );
};

FlexColumn.propTypes = {
  justify: PropTypes.string,
  children: PropTypes.array,
  remSize: PropTypes.number,
};

const Sidebar = () => {
  return (
    <Box minW="80px" w="300px" maxW="300px">
      <FlexColumn justify={"space-between"} remSize={4}>
        <FlexColumn justify={"start"} remSize={2}>
          <SidebarLogo />
          <SidebarDateTime />
          <SidebarMenu />
        </FlexColumn>
        <SidebarProfile />
      </FlexColumn>
    </Box>
  );
};

export default Sidebar;
