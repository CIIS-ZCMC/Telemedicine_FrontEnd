import Homeheader from "./Header/Homeheader";
import { useProSidebar } from "react-pro-sidebar";
import { Flex, Box, Spacer } from "@chakra-ui/react";
import "../Style/Sidebar.css";
import PropTypes from "prop-types";
import Sidebar from "./Sidebar/Sidebar";

const Layout = ({ children }) => {
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();

  const actionHandle = () => {
    if (broken) {
      toggleSidebar();
      return;
    }
    collapseSidebar();
  };

  return (
    <Flex>
      <Sidebar />
      <Spacer />
      <Flex w={"100%"} h={"100vh"} display={"flex"} flexDirection={"column"}>
        <Homeheader action={actionHandle} collapsed={collapsed} />
        <Box w={"100%"} h={"inherit"} bg="#f5f7f9" overflow="auto">
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

Layout.propTypes = {
  children: PropTypes.object,
};

export default Layout;
