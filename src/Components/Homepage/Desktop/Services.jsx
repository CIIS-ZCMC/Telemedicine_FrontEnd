import TitleHeader from "../TitleHeader";
import { Box, SimpleGrid } from "@chakra-ui/react";
import CardServices from "../CardServices";
import im from "../../../assets/Icons/im.png";
import ob from "../../../assets/Icons/ob.png";
import pedia from "../../../assets/Icons/pedia.png";

function Services() {
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
      desc: `Our team ensures exceptional care, creating a supportive environment for your 
      child's health, growth, and well-being, guaranteeing a bright future.`,
    },
    {
      title: "Obstetrics & Gynecology",
      img: ob,
      color: "#f2c1c1",
      desc: `Our dedicated experts provide comprehensive support throughout your pregnancy, 
      ensuring a safe and memorable experience for you and your baby`,
    },
  ];
  return (
    <div>
      <Box pt={40}>
        <TitleHeader title="Services" sub_title="Explore Our Services" />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        py={40}
        px={40}
      >
        <SimpleGrid spacing={10} templateColumns="repeat(3, 1fr)" px={40}>
          {servicesData.map((item, index) => (
            <CardServices
              key={index}
              title={item.title}
              img={item.img}
              color={item.color}
              desc={item.desc}
            />
          ))}
        </SimpleGrid>
      </Box>
    </div>
  );
}

export default Services;
