import { Flex, Link } from "@chakra-ui/react";
import React from "react";
import LogoHeader from "../LogoHeader";
import { HamburgerIcon } from "@chakra-ui/icons";

function MobileNavbar(props) {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <LogoHeader />
      <Link>
        <HamburgerIcon sx={{ boxSize: 25 }} />
      </Link>
    </Flex>
  );
}

export default MobileNavbar;
