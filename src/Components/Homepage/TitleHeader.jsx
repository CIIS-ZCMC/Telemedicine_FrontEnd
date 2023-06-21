import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { BiPulse } from "react-icons/bi";

function TitleHeader({ title }) {
  return (
    <div>
      <Box display="flex" alignItems="center" gap={2}>
        <BiPulse color="#74BEA5" fontSize={20} fontWeight={600} />
        <Text fontSize={13} color="#74BEA5" fontWeight={600}>
          {title}
        </Text>
      </Box>
    </div>
  );
}

export default TitleHeader;
