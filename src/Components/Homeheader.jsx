import { useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { BiCodeBlock } from "react-icons/bi";
import "../Style/App.css";
import "../Style/Sidebar.css";
import {
  Box,
  Avatar,
  Flex,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  Heading,
  Text,
  Stack,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineLogout } from "react-icons/ai";
import useAuth from "../Hooks/AuthContext";
import { useNavigate } from "react-router-dom";
// import Notification from "./Notification";
import profile from "../assets/default_profile.png";
// import UpdateProfile from "./UpdateProfile";
import { BsSearch, BsBell } from "react-icons/bs";
import { BiMessageDetail } from "react-icons/bi";
import useUser from "../Hooks/UserHook";
import useCase from "../Hooks/useCase";
import useThemeHook from "../Hooks/ThemeHook";
import PropTypes from "prop-types";

const MenuComponent = () => {
  const { user, signOut } = useUser();
  const navigate = useNavigate();

  const signOutUser = (e) => {
    e.preventDefault();

    signOut((status, feedback) => {
      switch (status) {
        case 200:
          navigate("/");
          break;
        default:
          console.log(feedback);
      }
    });
  };

  return (
    <Menu>
      <MenuButton className="">
        <button id="">
          <Avatar
            size="sm"
            src={user.url === "NONE" ? profile : user.url}
            name={user.name}
          />
        </button>
      </MenuButton>{" "}
      <MenuList shadow={"lg"}>
        <Box p={7} bg={"white"}>
          <Flex>
            <Box>
              <Avatar
                size="lg"
                src={user.url === "NONE" ? profile : user.url}
                name={user.name}
              />
            </Box>
            <Box ml={4}>
              <Stack>
                <Text fontWeight={"bold"} fontSize={13}>
                  {user.name}

                  {user.skill === null ? null : (
                    <>
                      <br />
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "normal",
                        }}
                      >
                        {user.skill}
                      </span>
                    </>
                  )}
                  <br />
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "normal",
                      textTransform: "uppercase",
                    }}
                  >
                    {user.hospital ?? "ZCMC"}
                  </span>
                </Text>
              </Stack>
            </Box>
          </Flex>
        </Box>
        <div style={{ border: "1px solid #d1eae5" }}></div>

        <MenuItem
          onClick={() => {
            navigate("profile");
          }}
          fontSize={14}
          color={"gray.600"}
        >
          <AiOutlineUser style={{ marginRight: "10px" }} />
          View Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("MyAccount");
          }}
          fontSize={14}
          color={"gray.600"}
        >
          <FiSettings style={{ marginRight: "10px" }} />
          Account Settings
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/credits");
          }}
          fontSize={14}
          color={"gray.600"}
        >
          <BiCodeBlock style={{ marginRight: "10px" }} />
          Credits
        </MenuItem>

        <MenuItem
          bg={"gray.50"}
          fontSize={14}
          color={"red.400"}
          onClick={(e) => signOutUser(e)}
        >
          <AiOutlineLogout style={{ marginRight: "10px" }} />
          Sign Out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

const RealTimeClock = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const amOrPm = hours >= 12 ? "PM" : "AM";

      // Convert to 12-hour format
      const twelveHourFormat = hours % 12 || 12;

      // Format the time as hh:mm AM/PM
      const formattedTime = `${twelveHourFormat}:${minutes
        .toString()
        .padStart(2, "0")} ${amOrPm}`;

      setCurrentTime(formattedTime);
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return <Heading fontWeight={600}>{currentTime}</Heading>;
};

const SearchComponent = () => {
  const { search, setSearch } = useCase();

  return (
    <Box
      display="flex"
      width={search === "" ? "inherit" : "15rem"}
      columnGap={2}
      alignItems="center"
      rounded={50}
      pl={4}
      pr={2}
      overflow="hidden"
      background={search === "" ? "transparent" : "white"}
      boxShadow={search === "" ? "none" : "md"}
      _hover={{
        "& > #search": {
          display: "inline-block",
          overflow: "hidden",
          whiteSpace: "nowrap",
        },
        width: "15rem",
        background: "white",
        boxShadow: "md",
        transition: "width 1s ease-in, background 0.5s ease-in",
      }}
    >
      <BsSearch size={20} />
      <Input
        id="search"
        display={search === "" ? "none" : "inline-block"}
        opacity={0}
        placeholder="Search case no."
        size="sm"
        border="none"
        focusBorderColor="none"
        transition="opacity 0.5s ease"
        _hover={{ opacity: 1 }}
        _focus={{ opacity: 1 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </Box>
  );
};

const Homeheader = ({ action, collapsed }) => {
  const { pageHeader, contentDescription, greetings } = useThemeHook();
  const { user } = useUser();
  const { isOpen, onClose } = useDisclosure();
  const { search, setSearch } = useAuth();

  // <UpdateProfile isOpen={isOpen} onClose={onClose} />

  return (
    <Box
      w={"100%"}
      h={"6.5rem"}
      pt={5}
      pl={5}
      pr={5}
      pb={5}
      bg="#f5f7f9"
      color="#666e74"
    >
      <Flex w="inherit" alignItems="center" justifyContent="space-between">
        <Heading size="lg">{pageHeader.toLocaleUpperCase()}</Heading>
        <Flex columnGap="1.5rem" alignItems="center">
          <SearchComponent />
          <BiMessageDetail size={24} />
          <BsBell size={24} />
        </Flex>
      </Flex>
      <Flex
        w="inherit"
        justifyContent="space-between"
        alignItems="center"
        mt={3}
      >
        <Text fontSize={16} fontWeight={500}>
          {`${greetings()}.`}
        </Text>
        <RealTimeClock />
      </Flex>
    </Box>
  );
};

Homeheader.propTypes = {
  action: PropTypes.function,
  collapsed: PropTypes.bool,
};

export default Homeheader;
