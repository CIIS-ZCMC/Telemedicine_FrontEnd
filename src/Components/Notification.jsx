import { useEffect } from "react";
import {
  IconButton,
  Box,
  Text,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useState, useCallback } from "react";
import { GetRequest } from "../Services/api";
import { Case } from "../Services/Paths";
import { useNavigate } from "react-router-dom";
import useUser from "../Hooks/UserHook";
import { HiBellAlert, HiOutlineBellAlert } from "react-icons/hi2";
import PropTypes from "prop-types";

const MenuItemComponent = ({ data, handleClick }) => {
  return (
    <MenuItem
      w={"20rem"}
      _hover={{ bg: "white" }}
      value={data.id}
      onClick={(e) => handleClick(e, data)}
    >
      <Box
        w="300px"
        boxShadow="md"
        p={2}
        rounded={5}
        _hover={{ bg: "lightgreen" }}
      >
        <Box display="flex" justifyContent={"space-between"}>
          <Heading size="sm">{data.case_number}</Heading>
          <Box
            bg={data.case_status === 0 ? "grey" : "green"}
            pl={3}
            pr={3}
            rounded={8}
            boxShadow="sm"
          >
            <Text fontSize={12} fontWeight={600} color="white">
              New
            </Text>
          </Box>
        </Box>
        <Box mt={2}>
          <Text fontSize={12}>{data.patient}</Text>
        </Box>
      </Box>
    </MenuItem>
  );
};

MenuItemComponent.propTypes = {
  data: PropTypes.object,
  handleClick: PropTypes.function,
};

const Notification = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [fetch, setFetch] = useState(true);
  const [cases, setCases] = useState([]);

  const handleClick = (e, data) => {
    e.preventDefault();
    navigate("/case-view", { state: data });
  };

  const handleFetch = useCallback(() => {
    GetRequest({ url: `${Case}/notification` })
      .then((res) => {
        if (!res.statusText === "OK") {
          throw new Error("Bad response.", { cause: res });
        }
        const {
          data: { data },
        } = res;

        if (data.length === cases.length) {
          return;
        }
        setCases(data);
      })
      .catch((err) => {
        switch (err) {
          case 400:
            console.log("Process can't complete. Try again later.");
            break;
          case 401:
            console.log("Unauthorized.");
            break;
          case 404:
            console.log("No record found.");
            break;
          default:
            console.log("Can't process right now. Try again later.");
            break;
        }
      });
  }, [cases]); // Add cases as a dependency to the useCallback hook

  useEffect(() => {
    const intervalId = setInterval(
      () => {
        if (fetch) {
          setFetch(false);
        }
        handleFetch();
      },
      fetch ? 0 : 50000
    );

    return () => clearInterval(intervalId);
  }, [fetch, handleFetch]);

  const filtered = cases.filter((filter) =>
    filter.cases_status === 2
      ? null
      : user.user_role !== "External Doctor"
      ? filter.info !== 1
      : filter.info === 1
  );

  return (
    <Box>
      <Menu>
        <MenuButton>
          <button>
            <IconButton
              w="30px"
              bg="white"
              size={["sm", "sm", "md", "md"]}
              mt={-1}
              rounded={100}
              onClick={(e) => handleClick(e)}
              icon={
                <Box fontSize={[25, 25, 30, 30]}>
                  {cases.length > 0 ? (
                    <HiBellAlert color={"orange"} />
                  ) : (
                    <HiOutlineBellAlert color={"grey"} />
                  )}
                </Box>
              }
            />
          </button>
        </MenuButton>
        <MenuList maxH={"30vh"} overflow="auto">
          {filtered.map((value, index) => {
            return (
              <MenuItemComponent
                key={index}
                data={value}
                handleClick={handleClick}
              />
            );
          })}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default Notification;
