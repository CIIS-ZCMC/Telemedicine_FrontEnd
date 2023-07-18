import { Container } from "@chakra-ui/react";
import MobileNavbar from "../../Components/Homepage/Mobile/MobileNavbar";
import MobileBanner from "../../Components/Homepage/Mobile/MobileBanner";
import MobileAbout from "../../Components/Homepage/Mobile/MobileAbout";
import MobileServices from "../../Components/Homepage/Mobile/MobileServices";
import MobileDoctors from "../../Components/Homepage/Mobile/MobileDoctors";
import MobileContactUs from "../../Components/Homepage/Mobile/MobileContactUs";
import MobileFooter from "../../Components/Homepage/Mobile/MobileFooter";

function MobileView() {
  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div>
      <Container maxW="container.lg" py={10}>
        <MobileNavbar handleSelectionClick={scrollToSection} />
      </Container>

      <div id="home">
        <Container width="80vw" my={10}>
          <MobileBanner />
        </Container>
      </div>

      <div id="about">
        <MobileAbout />
      </div>

      <div id="services" style={{ backgroundColor: "#f5fdfd" }}>
        <MobileServices />
      </div>

      <div id="doctors">
        <Container maxW="92vw" my={10}>
          <MobileDoctors />
        </Container>
      </div>

      <div id="contact-us">
        <MobileContactUs />
      </div>

      <div>
        <MobileFooter />
      </div>
    </div>
  );
}

export default MobileView;
