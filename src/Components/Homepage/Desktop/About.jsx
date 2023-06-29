import doc_cheng from "../../../assets/doctor/doc cheng (2).png";
import Carousel from "../Carousel";
import { Box, Image } from "@chakra-ui/react";
import bgImage2 from "../../../assets/3.png";
import TitleHeader from "../TitleHeader";
import { HiOutlineLightBulb } from "react-icons/hi";
import { BiBarChartAlt, BiTrophy } from "react-icons/bi";

function About() {
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
        backgroundPosition="top"
        width="100vw"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
        px={40}
        my={40}
      >
        <Box width="25%" align="right">
          <Image src={doc_cheng} alt="deputy_chair" width={350} />
        </Box>

        <Box width="60%" p={10} mt="200px">
          <TitleHeader title="About Us" sub_title="Know Us More" />
          <Carousel carouselItems={carouselItems} />
        </Box>
      </Box>
    </div>
  );
}

export default About;
