import { Box, Center, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { BiPulse } from "react-icons/bi";

function TitleHeader({ title, sub_title }) {
  return (
    <VStack>
      <Box display="flex" gap={2}>
        <BiPulse color="#74BEA5" fontSize={20} fontWeight={600} />
        <Text fontSize={13} color="#74BEA5" fontWeight={600}>
          {title}
        </Text>
      </Box>
      <Text fontSize={22} fontWeight={600} mt={sub_title ? 5 : 0}>
        {sub_title}
      </Text>
    </VStack>
  );
}

export default TitleHeader;
