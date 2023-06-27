import React from "react";
import CardServices from "../CardServices";
import TitleHeader from "../TitleHeader";
import im from "../../../assets/Icons/im.png";
import ob from "../../../assets/Icons/ob.png";
import pedia from "../../../assets/Icons/pedia.png";
import { useBreakpointValue, Box, Heading, SimpleGrid } from "@chakra-ui/react";

function MobileServices(props) {
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

  // const columnCount = useBreakpointValue({ base: 1, sm: 1, md: 2, lg: 3 });
  const space = useBreakpointValue({ base: 20, sm: 10, md: 10, lg: 10 });
  const width = useBreakpointValue({ base: 300, sm: 300, md: 400, lg: 400 });
  return (
    <div style={{ backgroundColor: "#f5fdfd" }}>
      <Box pt={10}>
        <TitleHeader title="Services" sub_title="Explore Our Services" />
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center" p={5}>
        <SimpleGrid spacing={space} columns={1} mt="150px" align="center">
          {servicesData.map((item) => (
            <>
              <CardServices
                title={item.title}
                img={item.img}
                color={item.color}
                desc={item.desc}
                width={width}
              />
            </>
          ))}
        </SimpleGrid>
      </Box>
    </div>
  );
}

export default MobileServices;
