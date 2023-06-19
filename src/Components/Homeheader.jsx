import { MdMenu, MdClose } from "react-icons/md";
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
  Text,
  Stack,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { AiOutlineLogout } from "react-icons/ai";
import useAuth from "../Hooks/AuthContext";
import { useNavigate } from "react-router-dom";
import ProfileDrawer from "./ProfileDrawer";
import Notification from "./Notification";
import { DeleteRequest } from "../API/api";
import { User } from "../API/Paths";
import profile from "../assets/default_profile.png";
import UpdateProfile from "./UpdateProfile";
import PropTypes from "prop-types";

const Homeheader = ({ action, collapsed }) => {
  const { user, setUser } = useAuth();
  const { isOpen, onClose } = useDisclosure();
  const { search, setSearch } = useAuth();
  const navigate = useNavigate();

  const signOutUser = (e) => {
    e.preventDefault();

    DeleteRequest({ url: `${User}/logout` })
      .then((res) => res.data)
      .then((res) => {
        if (!res.statusText === "OK") {
          throw new Error("Bad repsonse", { cause: res });
        }

        localStorage.clear();
        sessionStorage.removeItem("token");
        setUser(null);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Box
        w={"100%"}
        h={"55px"}
        pt={2}
        pr={2}
        pb={2}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <Box
          p={2}
          cursor={"pointer"}
          fontSize={[25, 25, 30, 30]}
          onClick={() => action()}
        >
          {collapsed ? <MdClose /> : <MdMenu />}
        </Box>
        <Box
          w={[200, 200, 350, 350]}
          maxW={350}
          minW={200}
          bg="rgba(0,0,0,0.04)"
          rounded={25}
          overflow="hidden"
        >
          <Input
            border={"none"}
            placeholder="Search"
            value={search}
            rounded={5}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>

        <Box>
          <Flex mr={0} p={1} columnGap={3} alignItems="center">
            {user.user_role !== "Super Admin" ? <Notification /> : null}
            <Box>
              <Menu>
                <MenuButton className="">
                  <button id="">
                    <Avatar
                      size="sm"
                      src={user.url === "NONE" ? profile : user.url}
                      name={user.name}
                    />
                  </button>
                </MenuButton>

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

                  <ProfileDrawer />

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
            </Box>
          </Flex>
        </Box>
      </Box>
      <UpdateProfile isOpen={isOpen} onClose={onClose} />
    </>
  );
};

Homeheader.propTypes = {
  action: PropTypes.function,
  collapsed: PropTypes.bool,
};

export default Homeheader;
