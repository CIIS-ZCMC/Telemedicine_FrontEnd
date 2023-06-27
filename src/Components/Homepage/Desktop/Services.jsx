import React from "react";
import TitleHeader from "../TitleHeader";
import { Container, Text, Box, Heading, SimpleGrid } from "@chakra-ui/react";
import CardServices from "../CardServices";
import im from "../../../assets/Icons/im.png";
import ob from "../../../assets/Icons/ob.png";
import pedia from "../../../assets/Icons/pedia.png";

function Services(props) {
  const servicesData = [
    {
      title: "Internal Medicine",
      img: im,
      color: "#c0e8fe",
      desc: `Our expert team delivers personalized, comprehensive solutions for a wide range of medical 
            conditions, prioritizing your well-being and long-term health.`,
    },
    {
      title: "Pediatrics",
      img: pedia,
      color: "#fed6b5",
      desc: `Our dedicated team of compassionate healthcare professionals is committed to nurturing your child's 
            health, growth, and overall well-being, creating a positive and supportive environment for their 
            bright futures.`,
    },
    {
      title: "Obstetrics & Gynecology",
      img: ob,
      color: "#f2c1c1",
      desc: `Our expert team of compassionate professionals is dedicated to guiding you through every 
            stage of your pregnancy, ensuring a safe and memorable experience for both you and your baby.`,
    },
  ];
  return (
    <div>
      <Box pt={20}>
        <TitleHeader title="Services" sub_title="Explore Our Services" />
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center" p={40}>
        <SimpleGrid spacing={10} templateColumns="repeat(3, 1fr)">
          {servicesData.map((item) => (
            <>
              <CardServices
                title={item.title}
                img={item.img}
                color={item.color}
                desc={item.desc}
              />
            </>
          ))}
        </SimpleGrid>
      </Box>
    </div>
  );
}

export default Services;
