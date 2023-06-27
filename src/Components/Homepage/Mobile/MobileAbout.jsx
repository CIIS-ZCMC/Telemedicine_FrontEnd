import React from "react";
import Carousel from "../Carousel";
import { Box, Image } from "@chakra-ui/react";
import bgImage2 from "../../../assets/3.png";
import TitleHeader from "../TitleHeader";
import { HiOutlineLightBulb } from "react-icons/hi";
import { BiBarChartAlt, BiTrophy } from "react-icons/bi";

function MobileAbout(props) {
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
        backgroundImage={`url(${bgImage2})`}
        backgroundSize="cover"
        backgroundPosition="center"
        justifyContent="center"
        alignItems="center"
        my={10}
        p={5}
      >
        <Box>
          <TitleHeader title="About Us" />
          <Carousel carouselItems={carouselItems} />
        </Box>
      </Box>
    </div>
  );
}

export default MobileAbout;
