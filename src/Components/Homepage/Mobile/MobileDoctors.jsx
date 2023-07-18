import TitleHeader from "../TitleHeader";
import CarouselDoctors from "../CarouselDoctors";
import { Box, useBreakpointValue } from "@chakra-ui/react";

function MobileDoctors() {
  const size = useBreakpointValue({ base: 1, sm: 1, md: 2, lg: 2 });
  return (
    <div>
      <Box textAlign="center">
        <TitleHeader title="Doctors" sub_title="Meet The Doctors" />
      </Box>

      <Box display="flex" alignItems="center" justifyContent="center">
        <CarouselDoctors size={size} />
      </Box>
    </div>
  );
}

export default MobileDoctors;
