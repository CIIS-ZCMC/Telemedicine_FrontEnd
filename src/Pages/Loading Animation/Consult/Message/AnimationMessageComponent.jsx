import { Box, SkeletonCircle, Skeleton } from "@chakra-ui/react";
import PropTypes from "prop-types";

const AnimationMessageComponent = ({ position }) => {
  return (
    <Box
      w="100%"
      float={position % 2 === 0 ? "right" : "left"}
      display="flex"
      flexDirection={position % 2 === 0 ? "row-reverse" : "row"}
      alignItems="center"
      p={3}
      columnGap={5}
      mb={5}
    >
      <SkeletonCircle size={35} />
      <Box w={Math.floor(Math.random() * 500) + 50}>
        <Box mt={2}>
          <Box dir={position % 2 === 0 ? "rtl" : "none"}>
            <Skeleton dir="ltr" rounded={5} backgroundColor="red" height={20} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

AnimationMessageComponent.propTypes = {
  position: PropTypes.integer,
};

export default AnimationMessageComponent;
