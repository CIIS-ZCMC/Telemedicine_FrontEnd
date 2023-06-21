import React from "react";
import doc_cheng from "../../../assets/doctor/doc cheng (2).png";
import Carousel from "../Carousel";
import { Flex, Box, Image, HStack, Text } from "@chakra-ui/react";
import bgImage from "../../../assets/wave_bg.png";
import TitleHeader from "../TitleHeader";
import { HiOutlineLightBulb } from "react-icons/hi";
import { TbTargetArrow } from "react-icons/tb";
import { BiBarChartAlt, BiTrophy } from "react-icons/bi";

function About(props) {
  const carouselItems = [
    {
      id: 1,
      icon: <HiOutlineLightBulb fontSize={20} color="#ED6C02" />,
      title: "Vision",
    },
    {
      id: 2,
      icon: <BiBarChartAlt fontSize={20} color="#ED6C02" />,
      title: "Mission",
    },
    {
      id: 3,
      icon: <BiTrophy fontSize={20} color="#ED6C02" />,
      title: "Core Values",
    },
  ];
  return (
    <div>
      <Box
        // backgroundImage={`url(${bgImage})`}
        // backgroundSize="cover"
        // backgroundPosition="center"
        width="100vw"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <Box width="20%" align="right">
          <Image src={doc_cheng} alt="deputy_chair" width={350} />
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
