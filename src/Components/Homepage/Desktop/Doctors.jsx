import { Box } from "@chakra-ui/react";

import TitleHeader from "../TitleHeader";
import CarouselDoctors from "../CarouselDoctors";

function Doctors() {
  return (
    <>
      <Box textAlign="center">
        <TitleHeader title="Doctors" sub_title="Meet The Doctors" />
      </Box>

      <Box display="flex" alignItems="center" justifyContent="center">
        <CarouselDoctors size={4} />
      </Box>
    </>
  );
}

export default Doctors;
