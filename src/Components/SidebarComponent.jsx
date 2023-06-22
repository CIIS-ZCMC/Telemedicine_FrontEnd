import { Sidebar, Menu, MenuItem, menuClasses } from "react-pro-sidebar";
import { Image, Flex, Box, Heading, Text } from "@chakra-ui/react";
import RouteData from "../Routes/RouteData";
import { useNavigate } from "react-router-dom";
import "../Style/Sidebar.css";
import useAuth from "../Hooks/AuthContext";
import PropTypes from "prop-types";
import logo from "../assets/zcmc_logo.png";

const SidebarDividerHeader = ({ data, header, collapsed }) => {
  return (
    <>
      {collapsed ? null : (
        <span
          key={data.index}
          style={{
            fontSize: "12px",
            marginLeft: "10%",
            color: "#37c739",
          }}
          id="consult"
        >
          {header}
        </span>
      )}
    </>
  );
};

SidebarDividerHeader.propTypes = {
  data: PropTypes.function,
  header: PropTypes.bool,
  collapsed: PropTypes.integer,
};

const SidebarHeader = ({ collapsed }) => {
  return (
    <Box w={"100%"} pl={3} pr={3} pt={3}>
      <Flex
        justifyContent={collapsed ? "center" : "space-between"}
        alignItems={"center"}
      >
        <Flex justifyContent={"center"} columnGap={2} alignItems={"center"}>
          <Box w={collapsed ? 12 : 8} transitionDuration={"0.5s"}>
            <Image src={logo} />
          </Box>

          <Heading
            display={collapsed ? "none" : "block"}
            transitionDuration={"0.5s"}
            fontSize={"1.4rem"}
            color="green"
          >
            TELEMEDICINE
          </Heading>
        </Flex>
      </Flex>
    </Box>
  );
};

SidebarHeader.propTypes = {
  collapsed: PropTypes.integer,
};

const MenuItemComponent = ({ child, click, title, path }) => {
  return (
    <MenuItem
      icon={
        <Box
          p={2}
          boxShadow="lg"
          bg="white"
          rounded={5}
          className="menu-item-icon"
        >
          {child}
        </Box>
      }
      className="menu-item"
      onClick={(e) => click(e, path)}
    >
      <Text width="full" className="menu-item-text">
        {title}
      </Text>
    </MenuItem>
  );
};

MenuItemComponent.propTypes = {
  child: PropTypes.object,
  click: PropTypes.function,
  title: PropTypes.string,
  path: PropTypes.string,
};

const SidebarComponent = ({ collapsed }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const theme = "light";

  const handleClick = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  const themes = {
    light: {
      sidebar: {
        backgroundColor: "#fff",
        color: "#607489",
      },
      menu: {
        menuContent: "#fbfcfd",
        icon: "#3e5e7e",
        hover: {
          backgroundColor: "#bed9e0",
          color: "teal",
          boxShadow: "10px 10px 8px #888888",
        },
        active: {
          backgroundColor: "#13395e",
          color: "#b6c8d9",
        },
        disabled: {
          color: "#3e5e7e",
        },
      },
    },
    dark: {
      sidebar: {
        backgroundColor: "#0b2948",
        color: "#8ba1b7",
      },
      menu: {
        menuContent: "#082440",
        icon: "#59d0ff",
        hover: {
          backgroundColor: "#0e3052",
          color: "#b6c8d9",
        },
        active: {
          backgroundColor: "#13395e",
          color: "#b6c8d9",
        },
        disabled: {
          color: "#3e5e7e",
        },
      },
    },
  };

  const menuItemStyles = {
    root: {
      fontSize: "14px",
      fontWeight: 400,
    },
    icon: {
      color: themes[theme].menu.icon,
    },
    SubMenuExpandIcon: {
      color: "#b6b7b9",
    },
    subMenuContent: {
      backgroundColor: themes[theme].menu.menuContent,
    },
    button: {
      [`&.${menuClasses.active}`]: {
        backgroundColor: themes[theme].menu.active.backgroundColor,
        color: themes[theme].menu.active.color,
      },
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
      "&:hover": {
        backgroundColor: themes[theme].menu.hover.backgroundColor,
        color: themes[theme].menu.hover.color,
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  return (
    <Box>
      <Sidebar h={"100vh"} backgroundColor="white" breakPoint="lg">
        <SidebarHeader collapsed={collapsed} />
        <Box h={20}></Box>
        <Menu menuItemStyles={menuItemStyles}>
          {RouteData.path
            .filter((x) =>
              user.user_role === "Super Admin"
                ? x.superadmin === true
                : user.user_role === "Admin"
                ? x.admin === true
                : user.user_role === "Internal Doctor"
                ? x.doctor === true
                : x.index !== 9 && user.user_role === "External Doctor"
                ? x.edoctor === true
                : user.user_role === "Staff"
                ? x.staff === true
                : null
            )
            .map((data) => {
              return (
                <>
                  {data.index === 1 || data.index === 5 || data.index === 9 ? (
                    <SidebarDividerHeader
                      data={data}
                      header={
                        data.index === 1
                          ? "ANALYTICS"
                          : data.index === 5
                          ? "CONSULTATION"
                          : "REPORT"
                      }
                      key={data.index * 2}
                      collapsed={collapsed}
                    />
                  ) : null}
                  <MenuItemComponent
                    key={data.index}
                    title={data.label}
                    path={data.href}
                    child={data.icon}
                    click={(e) => handleClick(e, data.href)}
                  />
                </>
              );
            })}
        </Menu>
      </Sidebar>
    </Box>
  );
};

SidebarComponent.propTypes = {
  collapsed: PropTypes.bool,
};

export default SidebarComponent;
