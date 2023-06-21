import React from "react";
import TitleHeader from "../TitleHeader";
import { Container, Text, Box, Heading, SimpleGrid } from "@chakra-ui/react";
import CardServices from "../CardServices";
import im from "../../../assets/Icons/im.png";
import ob from "../../../assets/Icons/ob.png";
import pedia from "../../../assets/Icons/pedia.png";
import pysch from "../../../assets/Icons/pysch.png";

function Services(props) {
  const servicesData = [
    { title: "Internal Medicine", img: im, color: "#c0e8fe" },
    { title: "Pediatrics", img: pedia, color: "#fed6b5" },
    { title: "Obstetrics & Gynecology", img: ob, color: "#f2c1c1" },
    { title: "Psychiatry", img: pysch, color: "#efcef4" },
  ];
  return (
    <div style={{ backgroundColor: "#f5fdfd", height: "100vh" }}>
      <Container maxW="80vw" mb={20} centerContent>
        <Box mt="150px">
          <TitleHeader title="Services" />
        </Box>
        <Box my={10}>
          <Heading size="lg">Explore Our Services</Heading>
        </Box>
        <SimpleGrid spacing={10} templateColumns="repeat(4, 1fr)" mt="150px">
          {servicesData.map((item) => (
            <>
              <CardServices
                title={item.title}
                img={item.img}
                color={item.color}
              />
            </>
          ))}
        </SimpleGrid>
      </Container>
    </div>
  );
}

export default Services;
