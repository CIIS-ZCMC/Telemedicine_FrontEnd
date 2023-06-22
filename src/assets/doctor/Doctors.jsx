import React from "react";
import DoctorTile from "../../Components/Homepage/DoctorTile";
import { Box, Center, HStack } from "@chakra-ui/react";

import TitleHeader from "../../Components/Homepage/TitleHeader";
import CarouselDoctors from "../../Components/Homepage/CarouselDoctors";

function Doctors() {
  return (
    <>
      <Box textAlign="center">
        <TitleHeader title="Doctors" sub_title="Meet The Doctors" />
      </Box>

      <CarouselDoctors />
    </>
  );
}

export default Doctors;