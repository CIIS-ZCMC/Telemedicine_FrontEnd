import React from "react";
import doc_cheng from "../../../assets/doctor/doc cheng (2).png";
import Carousel from "../Carousel";
import { Flex, Box, Image, HStack, Text } from "@chakra-ui/react";
import bgImage from "../../../assets/wave_bg.jpg";
import TitleHeader from "../TitleHeader";
function About(props) {
  const carouselItems = [
    {
      id: 1,
      title: "Vision",
      content: `ZCMC Regional Telemedicine Center will be the primary multi-specialty telehealth referral center in Zamboanga Peninsula and beyond by 2028.`,
    },
    {
      id: 2,
      title: "Mission",
      content: `To provide competent specialized telehealth services through state-of the-art technology across Zamboanga Peninsula and beyond.`,
    },
    {
      id: 3,
      title: "Core Values",
      content: ` Teamwork,
          Efficiency,
          Love and loyalty,
          Excellence,
          Meritocracy, 
          Equality in gender and ethnicity, 
          Dependability and responsibility safety`,
    },
  ];
  return (
    <div>
      <Box
        backgroundImage={`url(${bgImage})`}
        backgroundSize="cover"
        backgroundPosition="center"
        width="100vw"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <Box width="20%" align="right">
          <Image src={doc_cheng} alt="deputy_chair" width={400} />
        </Box>

        <Box marginLeft="2rem" width="60%" p={10} mt={20}>
          <TitleHeader title="About Us" />
          <Carousel carouselItems={carouselItems} />
        </Box>
      </Box>
    </div>
  );
}

export default About;
