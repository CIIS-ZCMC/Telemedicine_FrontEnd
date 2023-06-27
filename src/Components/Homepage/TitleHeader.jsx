import { Box, Text, VStack } from "@chakra-ui/react";
import { BiPulse } from "react-icons/bi";
import PropTypes from "prop-types";

function TitleHeader({ title, sub_title }) {
  return (
    <VStack>
      <Box display="flex" gap={2}>
        <BiPulse color="orange" fontSize={20} fontWeight={600} />
        <Text fontSize={13} color="orange" fontWeight={600}>
          {title}
        </Text>
      </Box>
      <Text fontSize={22} fontWeight={600} mt={sub_title ? 5 : 0}>
        {sub_title}
      </Text>
    </VStack>
  );
}

TitleHeader.propTypes = {
  title: PropTypes.string,
  sub_title: PropTypes.string,
};

export default TitleHeader;
