import { Box, Flex, Link, VStack, Text, HStack } from "@chakra-ui/react";
import { useState } from "react";
import LogoHeader from "../LogoHeader";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import ButtonComponent from "../ButtonComponent";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";

const navItem = [
  {
    name: "Home",
    href: "home",
  },
  {
    name: "About Us",
    href: "about",
  },
  {
    name: "Services",
    href: "services",
  },
  {
    name: "Doctors",
    href: "doctors",
  },
  {
    name: "Contact Us",
    href: "contact-us",
  },
];

function MobileNavbar({ handleSelectionClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("home");

  const handleClick = (item) => {
    setActiveItem(item.href);
    handleSelectionClick(`#${item.href}`);
  };

  const handleMenuToggle = () => {
    // console.log(isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
  };
  let navigate = useNavigate();
  const menuContainerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: isMenuOpen ? "100%" : "0",
    overflow: "hidden",
    transition: "width 0.3s ease",
    zIndex: isMenuOpen ? 999 : -1,
    backgroundColor: "#f5fdfd",
  };

  return (
    <>
      <Flex
        bgColor="white"
        justifyContent="space-between"
        alignItems="center"
        zIndex={50}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          py: 3,
          px: 5,
        }}
      >
        <LogoHeader />
        <Link onClick={handleMenuToggle}>
          <HamburgerIcon sx={{ boxSize: 25 }} />
        </Link>
      </Flex>

      <div style={menuContainerStyle}>
        <Link
          onClick={handleMenuToggle}
          sx={{
            position: "absolute",
            top: 3.5,
            right: 10,
            zIndex: 1000,
          }}
        >
          <CloseIcon sx={{ boxSize: 3 }} />
        </Link>

        {isMenuOpen && (
          <VStack gap={10} pt={20}>
            {navItem.map((item, index) => {
              return (
                <Box key={index}>
                  <Text
                    fontSize={15}
                    fontWeight={item.href === activeItem ? 600 : 400}
                    color={item.href === activeItem ? "teal" : ""}
                    // borderBottom={item.active ? "1px solid teal" : "none"}
                    // borderBottomWidth={2}
                    onClick={() => handleClick(item)}
                    cursor="pointer"
                  >
                    {item.name}
                  </Text>
                </Box>
              );
            })}
            <Link href="/login">Sign in</Link>
            <HStack gap={4} fontSize={15}>
              <ButtonComponent
                icon={<ArrowForwardIcon />}
                text="Register"
                bgColor="#2EACAC"
                variant="solid"
                action={() => {
                  navigate("/register");
                }}
                borderRadius={50}
              />
            </HStack>
          </VStack>
        )}
      </div>
    </>
  );
}

MobileNavbar.propTypes = {
  handleSelectionClick: PropTypes.func,
};

export default MobileNavbar;
