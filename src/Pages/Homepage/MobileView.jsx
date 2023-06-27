import { Container } from "@chakra-ui/react";
import React from "react";
import MobileNavbar from "../../Components/Homepage/Mobile/MobileNavbar";
import MobileBanner from "../../Components/Homepage/Mobile/MobileBanner";
import MobileAbout from "../../Components/Homepage/Mobile/MobileAbout";
import MobileServices from "../../Components/Homepage/Mobile/MobileServices";
import MobileDoctors from "../../Components/Homepage/Mobile/MobileDoctors";
import MobileContactUs from "../../Components/Homepage/Mobile/MobileContactUs";
import MobileFooter from "../../Components/Homepage/Mobile/MobileFooter";

function MobileView(props) {
  return (
    <div>
      <Container maxW="container.lg" py={4}>
        <MobileNavbar />
      </Container>
      <Container width="80vw" my={10}>
        <MobileBanner />
      </Container>
      <div>
        <MobileAbout />
      </div>
      <div style={{ backgroundColor: "#f5fdfd" }}>
        <MobileServices />
      </div>
      <Container maxW="92vw" my={10}>
        <MobileDoctors />
      </Container>
      <div>
        <MobileContactUs />
      </div>
      <div>
        <MobileFooter />
      </div>
    </div>
  );
}

export default MobileView;
