import React from "react";
import { Box, Image, IconButton, Text, HStack } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import DoctorTile from "./DoctorTile";
import doc_irene from "../../assets/doctor/doc_irene.png";
import doc_jessa from "../../assets/doctor/doc_jessa.png";
import doc_ben from "../../assets/doctor/doc_ben.png";
import doc_erwin from "../../assets/doctor/doc_erwin.png";

const doctors = [
  {
    id: 1,
    img: doc_irene,
    name: "Dr. Aireen Marie C. Sta. Teresa",
    title: "Medical Officer IV",
    spec: "OB-Gyne",
  },
  {
    id: 2,
    img: doc_jessa,
    name: "Dr. Jessa mayet A. Sumatra-Mabalot",
    title: "Medical Officer III",
    spec: "General Practitioner",
  },
  {
    id: 3,
    img: doc_ben,
    name: "Dr. Ben Jason H. Caranay",
    title: "Medical Officer IV",
    spec: "Pediatrics",
  },
  {
    id: 4,
    img: doc_erwin,
    name: "Dr. Erwin M. barrios",
    title: "Medical Officer IV",
    spec: "Pediatrics",
  },
  {
    id: 5,
    img: doc_jessa,
    name: "Dr. Aireen Marie C. Sta. Teresa",
    title: "Medical Officer IV",
    spec: "OB-Gyne",
  },
  {
    id: 6,
    img: doc_jessa,
    name: "Dr. Jessa mayet A. Sumatra-Mabalot",
    title: "Medical Officer III",
    spec: "General Practitioner",
  },
  {
    id: 7,
    img: doc_ben,
    name: "Dr. Ben Jason H. Caranay",
    title: "Medical Officer IV",
    spec: "Pediatrics",
  },
  {
    id: 8,
    img: doc_jessa,
    name: "Dr. Erwin M. barrios",
    title: "Medical Officer IV",
    spec: "Pediatrics",
  },
];

function Carousel() {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Function to handle next button click
  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === doctors.length - slideSize ? 0 : prevIndex + 1
    );
  };

  // Function to handle previous button click
  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? doctors.length - slideSize : prevIndex - 1
    );
  };

  const slideSize = 4; // Number of doctors to display in each slide
  const totalSlides = doctors.length / slideSize;

  const startIdx = currentIndex * slideSize;
  const visibleDoctors = doctors.slice(startIdx, startIdx + slideSize);

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
        <Box mt={10} px={20}>
          <Text fontSize={32} fontWeight={600} color="#005858">
            {/* {doctors[currentIndex].title} */}
          </Text>
          <HStack gap={8} my={40}>
            {visibleDoctors.map((doctor) => (
              <DoctorTile
                key={doctor.id}
                img={doctor.img}
                name={doctor.name}
                title={doctor.title}
                spec={doctor.spec}
              />
            ))}
          </HStack>
        </Box>
        <IconButton
          variant={hasNext ? "solid" : "outline"}
          isDisabled={hasNext ? false : true}
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