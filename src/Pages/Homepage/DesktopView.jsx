import { Container } from "@chakra-ui/react";
import React from "react";
import Navbar from "../../Components/Homepage/Desktop/Navbar";
import Banner from "../../Components/Homepage/Desktop/Banner";

function DesktopView(props) {
  return (
    <div
      style={{
        paddingTop: 40,
        height: "30vh",
        backgroundImage: "linear-gradient(#69C3C3, white)",
      }}
    >
      <Container maxW="80vw">
        <div style={{ height: "100vh" }}>
          <Navbar />
          <div style={{ paddingTop: 80 }}>
            <Banner />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default DesktopView;
