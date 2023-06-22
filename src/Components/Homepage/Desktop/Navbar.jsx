import { Flex, HStack, Link, Text } from "@chakra-ui/react";
import LogoHeader from "../LogoHeader";
import ButtonComponent from "../ButtonComponent";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const navItem = [
  {
    name: "Home",
    href: "#home",
    active: true,
  },
  {
    name: "About Us",
    href: "#about",
  },
  {
    name: "Services",
    href: "#services",
  },
  {
    name: "Doctors",
    href: "#doctors",
  },
  {
    name: "Contact Us",
    href: "#contact-us",
  },
];

function Navbar() {
  return (
    <div>
      <Flex
        justifyContent="space-between"
        py={4}
        px={6}
        backgroundColor="white"
        boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
        borderRadius={10}
        zIndex={50}
        sx={{ position: "static" }}
      >
        <LogoHeader />
        <HStack gap={10}>
          {navItem.map((item) => {
            return (
              <>
                <Text
                  fontSize={15}
                  fontWeight={item.active ? 600 : 400}
                  color={item.active ? "teal" : ""}
                  // borderBottom={item.active ? "1px solid teal" : "none"}
                  // borderBottomWidth={2}
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
