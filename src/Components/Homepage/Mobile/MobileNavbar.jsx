import { Flex, Link, VStack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import LogoHeader from "../LogoHeader";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";

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

  const menuContainerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: isMenuOpen ? "50%" : "0",
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
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <LogoHeader />
        <Link onClick={handleMenuToggle}>
          {isMenuOpen ? (
            <CloseIcon boxSize={3} />
          ) : (
            <HamburgerIcon sx={{ boxSize: 25 }} />
          )}
        </Link>
      </Flex>
      <div style={menuContainerStyle}>
        {isMenuOpen && (
          <VStack gap={10} pt={20}>
            {navItem.map((item) => {
              return (
                <>
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
                </>
              );
            })}
          </VStack>
        )}
      </div>
    </>
  );
}

export default MobileNavbar;
