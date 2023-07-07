import { Box, Center, Container, IconButton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Homepage/Desktop/Navbar";
import Banner from "../../Components/Homepage/Desktop/Banner";
import About from "../../Components/Homepage/Desktop/About";
import Doctors from "../../Components/Homepage/Desktop/Doctors";
import Services from "../../Components/Homepage/Desktop/Services";
import ContactUs from "../../Components/Homepage/Desktop/ContactUs";
import bg from "../../assets/3.png";
import { BiGame } from "react-icons/bi";
import Footer from "../../Components/Homepage/Desktop/Footer";
import { HiArrowUp } from "react-icons/hi";

function DesktopView() {
  const [currSection, setCurrSection] = useState("");
  const [displayBtn, setDisplayBtn] = useState(true);

  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {
      let current = "";

      sections.forEach((section) => {
        const sectTop = section.offsetTop;
        const sectHeight = section.clientHeight;
        const sect = sectTop - sectHeight / 3;
        if (window.pageYOffset >= sect) {
          current = section.getAttribute("id");
        }
      });

      setCurrSection(current);
    });
  }, []);
  return (
    <div
      style={{
        paddingY: 100,
        height: "30vh",
        backgroundImage: "linear-gradient(#69C3C3, white)",
        width: "100vw",
      }}
    >
      <section id="home">
        <Container maxW="80vw" mb={10} pt={10} height="100vh">
          <Navbar
            handleSelectionClick={scrollToSection}
            currentSection={currSection}
          />
          <Box pt="10vh">
            <Banner />
          </Box>
        </Container>
      </section>

      <section id="about" style={{ height: "100vh" }}>
        <About />
      </section>

      <section
        id="services"
        style={{ backgroundColor: "#f5fdfd", height: "100vh" }}
      >
        <Services />
      </section>

      <section id="doctors" style={{ paddingTop: 80 }}>
        <Container py={20}>
          <Doctors />
        </Container>
      </section>

      <section
        id="contact-us"
        style={{
          backgroundColor: "#f5fdfd",
          height: "100vh",
          paddingTop: 110,
        }}
      >
        <ContactUs />
      </section>

      <section>
        <Container maxW="80vw" pt={10} pb={3}>
          <Footer />
        </Container>
      </section>
    </div>
  );
}

export default DesktopView;
