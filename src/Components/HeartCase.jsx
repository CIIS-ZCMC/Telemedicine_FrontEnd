import { useState } from "react";
import { IconButton, Box, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import MenuItemComponent from "./MenuItemComponent";

const dataSample = [
  {
    id: 2551,
    status: 1,
    name: "Juan Ponce Enrile",
  },
  {
    id: 2552,
    status: 3,
    name: "Juan Ponce Enrile",
  },
  {
    id: 2553,
    status: 1,
    name: "Juan Ponce Enrile",
  },
  {
    id: 2554,
    status: 2,
    name: "Juan Ponce Enrile",
  },
];

const Notification = () => {
  const [active, setActive] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setActive(!active);
  };

  return (
    <Box>
      <Menu>
        <MenuButton>
          <button>
            <IconButton
              w={30}
              size={["sm", "sm", "md", "md"]}
              mt={-1}
              rounded={100}
              onClick={(e) => handleClick(e)}
              icon={
                <Box
                  color={active ? "red" : "grey"}
                  fontSize={[24, 24, 29, 29]}
                >
                  {active ? <AiFillHeart /> : <AiOutlineHeart />}
                </Box>
              }
            />
          </button>
        </MenuButton>
        <MenuList maxH={"30vh"} overflow="auto">
          {dataSample.map((value, index) => {
            return <MenuItemComponent key={index} data={value} />;
          })}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default Notification;
