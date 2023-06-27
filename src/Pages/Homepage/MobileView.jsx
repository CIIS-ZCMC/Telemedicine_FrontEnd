import { Container } from "@chakra-ui/react";
import React from "react";
import MobileNavbar from "../../Components/Homepage/Mobile/MobileNavbar";
import MobileBanner from "../../Components/Homepage/Mobile/MobileBanner";

function MobileView(props) {
  return (
    <div>
      <Container maxW="container.lg" py={4}>
        <MobileNavbar />
      </Container>
      <Container width="80vw" my={10}>
        <MobileBanner />
      </Container>
    </div>
  );
}

export default MobileView;
