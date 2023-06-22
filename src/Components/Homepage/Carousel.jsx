import React from "react";
import { Box, Image, IconButton, Text, SimpleGrid } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { getContentForId } from "./AboutContent";
import CardComponent from "./Card";

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

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < carouselItems.length - 2;

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
        <SimpleGrid spacing={5} templateColumns="repeat(2, 1fr)" p={20}>
          {carouselItems.slice(currentIndex, currentIndex + 2).map((item) => (
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
