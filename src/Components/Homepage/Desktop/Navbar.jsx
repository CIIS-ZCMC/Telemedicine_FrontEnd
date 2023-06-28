import { Flex, HStack, Link, Text } from "@chakra-ui/react";
import LogoHeader from "../LogoHeader";
import ButtonComponent from "../ButtonComponent";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";

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

function Navbar({ handleSelectionClick }) {
  const [isSticky, setIsSticky] = useState(false);
  const [activeItem, setActiveItem] = useState("home");

  const handleClick = (item) => {
    setActiveItem(item.href);
    handleSelectionClick(`#${item.href}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      <Flex
        justifyContent="space-between"
        py={isSticky ? 2 : 4}
        px={6}
        backgroundColor="white"
        boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
        borderRadius={isSticky ? 0 : 10}
        zIndex={50}
        sx={{
          position: isSticky ? "fixed" : "static",
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <LogoHeader />
        <HStack gap={10}>
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
        </HStack>

        <HStack gap={4} fontSize={15}>
          <Link href="/login">Sign in</Link>
          <ButtonComponent
            icon={<ArrowForwardIcon />}
            text="Register"
            bgColor="#2EACAC"
            variant="solid"
            borderRadius={50}
          />
        </HStack>
      </Flex>
    </div>
  );
}

export default Navbar;
