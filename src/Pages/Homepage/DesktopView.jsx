import { Container } from "@chakra-ui/react";
import Navbar from "../../Components/Homepage/Desktop/Navbar";
import Banner from "../../Components/Homepage/Desktop/Banner";
import About from "../../Components/Homepage/Desktop/About";
import Doctors from "../../assets/doctor/Doctors";
import Services from "../../Components/Homepage/Desktop/Services";
import ContactUs from "../../Components/Homepage/Desktop/ContactUs";

function DesktopView() {
  return (
    <div
      style={{
        paddingY: 100,
        height: "30vh",
        backgroundImage: "linear-gradient(#69C3C3, white)",
        width: "100vw",
      }}
    >
      <Container maxW="80vw" mb={20} pt={10} height="100vh">
        <div>
          <Navbar />
          <div
            style={{
              paddingTop: "10vh",
            }}
          >
            <Banner />
          </div>
        </div>
      </Container>

      <div>
        <About />
      </div>

      <div>
        <Services />
      </div>

      <Container maxW="92vw" py={20}>
        <div style={{ paddingTop: 80 }}>
          <Doctors />
        </div>
      </Container>

      <div>
        <ContactUs />
      </div>
    </div>
  );
}

export default DesktopView;
