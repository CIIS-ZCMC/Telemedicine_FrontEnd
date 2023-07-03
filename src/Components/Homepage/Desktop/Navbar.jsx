import { Flex, HStack, IconButton, Link, Text } from "@chakra-ui/react";
import LogoHeader from "../LogoHeader";
import ButtonComponent from "../ButtonComponent";
import { ArrowForwardIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowUp } from "react-icons/hi";

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

function Navbar({ currentSection, handleSelectionClick }) {
  const [isSticky, setIsSticky] = useState(false);
  const [activeItem, setActiveItem] = useState("home");
  const sectionRefs = useRef([]);
  const [displayBtn, setDisplayBtn] = useState(false);

  let navigate = useNavigate();

  const handleClick = (item) => {
    setActiveItem(item.href);
    handleSelectionClick(`#${item.href}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 0);
      setDisplayBtn(offset > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleBacktoTop = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }

    console.log(element);
  };

  useEffect(() => {
    setActiveItem(currentSection);
  }, [currentSection, displayBtn]);
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
            action={() => {
              navigate("/register");
            }}
            borderRadius={50}
          />
        </HStack>
      </Flex>

      {displayBtn ? (
        <div
          style={{
            maxHeight: "100vh",
            position: "fixed",
            right: 60,
            bottom: 50,
            opacity: 0.9,
          }}
        >
          <IconButton
            colorScheme="teal"
            aria-label="Back to Top"
            size="lg"
            variant="solid"
            onClick={() => {
              handleBacktoTop("#home");
            }}
            icon={<HiArrowUp />}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Navbar;
