import React from "react";
import { Box, Image, IconButton, Text } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { getContentForId } from "./AboutContent";

function Carousel({ carouselItems }) {
  // Current index of the active item
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Function to handle next button click
  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to handle previous button click
  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  };

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < carouselItems.length - 1;

  return (
    <div>
      <Box position="relative">
        <IconButton
          variant={hasPrevious ? "solid" : "outline"}
          icon={<ChevronLeftIcon />}
          onClick={handlePrevClick}
          position="absolute"
          left="0"
          top="50%"
          transform="translateY(-50%)"
          borderRadius="full"
          colorScheme="green"
          fontSize="20px"
        />
        <Box mt={10} px={20}>
          <Text fontSize={32} fontWeight={600} color="#005858">
            {carouselItems[currentIndex].title}
          </Text>
        </Box>
        <Box pt={5} px={20}>
          {getContentForId(carouselItems[currentIndex].id)}

          {/* {carouselItems[currentIndex].id === 1 ? (
            <Text>
              ZCMC Regional Telemedicine Center will be the primary
              multi-specialty telehealth referral center in Zamboanga Peninsula
              and beyond by 2028.{" "}
            </Text>
          ) : carouselItems[currentIndex].id === 2 ? (
            <Text>
              To provide competent specialized telehealth services through
              state-of the-art technology across Zamboanga Peninsula and beyond.{" "}
            </Text>
          ) : carouselItems[currentIndex].id === 3 ? (
            <Text>
              <b>T</b>eamwork,&nbsp;
              <b>E</b>fficiency,&nbsp;
              <b>L</b>ove and loyalty,&nbsp;
              <b>E</b>xcellence,&nbsp;
              <b>M</b>eritocracy,&nbsp;
              <b>E</b>quality in gender and ethnicity,&nbsp;
              <b>D</b>ependability and responsibility safety&nbsp;
            </Text>
          ) : (
            ""
          )} */}
        </Box>

        {/* <Image
            src={carouselItems[currentIndex].title}
            alt={`Carousel Item ${currentIndex + 1}`}
          /> */}

        <IconButton
          variant={hasNext ? "solid" : "outline"}
          icon={<ChevronRightIcon />}
          onClick={handleNextClick}
          position="absolute"
          right="0"
          top="50%"
          transform="translateY(-50%)"
          borderRadius="full"
          colorScheme="green"
          fontSize="20px"
        />
      </Box>
    </div>
  );
}

export default Carousel;
