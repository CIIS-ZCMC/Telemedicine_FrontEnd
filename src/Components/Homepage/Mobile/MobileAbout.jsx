import React from "react";
import Carousel from "../Carousel";
import { Box, Image, useBreakpointValue } from "@chakra-ui/react";
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
  const padding = useBreakpointValue({ base: 5, sm: 5, md: 40, lg: 40 });
  return (
    <div>
      <Box
        backgroundImage={`url(${bgImage2})`}
        backgroundSize="cover"
        backgroundPosition="center"
        justifyContent="center"
        alignItems="center"
        width="100vw"
        my={10}
        p={5}
        px={padding}
      >
        <Box>
          <TitleHeader title="About Us" sub_title="Know Us More" />
          <Carousel carouselItems={carouselItems} />
        </Box>
      </Box>
    </div>
  );
}

export default MobileAbout;
