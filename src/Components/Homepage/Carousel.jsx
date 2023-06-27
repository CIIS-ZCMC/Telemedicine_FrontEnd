import React from "react";
import { Box, IconButton, SimpleGrid } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { getContentForId } from "./AboutContent";
import CardComponent from "./Card";
import PropTypes from "prop-types";

function Carousel({ carouselItems }) {
  // Current index of the active item
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Function to handle next button click
  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselItems.length - 2 ? 0 : prevIndex + 1
    );
  };

  // Function to handle previous button click
  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselItems.length - 2 : prevIndex - 1
    );
  };

  const totalSlides = carouselItems.length / 2;
  const startIdx = currentIndex * 2;

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex + 1 < totalSlides;

  return (
    <div>
      <Box position="relative">
        <IconButton
          variant={hasPrevious ? "solid" : "outline"}
          icon={<ChevronLeftIcon />}
          onClick={handlePrevClick}
          isDisabled={hasPrevious ? false : true}
          position="absolute"
          left="0"
          top="50%"
          transform="translateY(-50%)"
          borderRadius="full"
          colorScheme="green"
          fontSize="20px"
        />
        <SimpleGrid spacing={5} templateColumns="repeat(2, 1fr)" p={20}>
          {carouselItems.slice(startIdx, startIdx + 2).map((item) => (
            <>
              <CardComponent
                icon={item.icon}
                title={item.title}
                content={getContentForId(item.id)}
              />
            </>
          ))}
        </SimpleGrid>

        <IconButton
          variant={hasNext ? "solid" : "outline"}
          icon={<ChevronRightIcon />}
          onClick={handleNextClick}
          isDisabled={hasNext ? false : true}
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

Carousel.propTypes = {
  carouselItems: PropTypes.object,
};
export default Carousel;
