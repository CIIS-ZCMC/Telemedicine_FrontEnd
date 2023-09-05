import React from "react";
import { Box, IconButton, Text, HStack } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import DoctorTile from "./DoctorTile";
import doc_irene from "../../assets/doctor/doc_irene.png";
import doc_jessa from "../../assets/doctor/doc_jessa.png";
import doc_ben from "../../assets/doctor/doc_ben.png";
import doc_erwin from "../../assets/doctor/doc_erwin.png";
import doc_cheng from "../../assets/doctor/doc_cheng.png";
import doc_pat from "../../assets/doctor/doc_pat.png";
import doc_maali from "../../assets/doctor/doc_maali.png";
import doc_juljani from "../../assets/doctor/doc_juljani.png";
import doc_sitti from "../../assets/doctor/doc_sitti.png";
import PropTypes from "prop-types";

const doctors = [
  {
    id: 0,
    img: doc_cheng,
    name: "Dr. Marichelle H. Valeros",
    title: "Medical Officer IV",
    spec: "Deputy Head - Telemedicine",
  },
  {
    id: 1,
    img: doc_pat,
    name: "Dr. Patricia Katherine D. Cabato",
    title: "Medical Officer IV",
    spec: "Internal Medicine",
  },
  {
    id: 2,
    img: doc_ben,
    name: "Dr. Ben Jason H. Caranay",
    title: "Medical Officer IV",
    spec: "Pediatrics",
  },
  {
    id: 3,
    img: doc_erwin,
    name: "Dr. Erwin M. Barrios",
    title: "Medical Officer IV",
    spec: "Pediatrics",
  },
  {
    id: 4,
    img: doc_irene,
    name: "Dr. Aireen Marie C. Sta. Teresa",
    title: "Medical Officer IV",
    spec: "OB-Gyne",
  },
  {
    id: 5,
    img: doc_juljani,
    name: "Dr. Ma. Fe P. Sarsoza-Juljani",
    title: "Medical Officer IV",
    spec: "General Practitioner",
  },
  {
    id: 6,
    img: doc_maali,
    name: "Dr. Ruby A. Maali",
    title: "Medical Officer III",
    spec: "OB-Gyne",
  },
  {
    id: 7,
    img: doc_sitti,
    name: "Dr. Sitti Sophia A. Jupli, FPCP",
    title: "Medical Officer III",
    spec: "Internal Medicine",
  },
  {
    id: 8,
    img: doc_jessa,
    name: "Dr. Jessa Mayet A. Sumatra-Mabalot",
    title: "Medical Officer III",
    spec: "General Practitioner",
  },
];

function Carousel({ size }) {
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

  const slideSize = size; // Number of doctors to display in each slide
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

Carousel.propTypes = {
  size: PropTypes.number,
};

export default Carousel;
