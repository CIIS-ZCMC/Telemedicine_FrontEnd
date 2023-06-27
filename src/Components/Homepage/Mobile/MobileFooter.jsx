import React from "react";
import { Box, Flex, Link, Text } from "@chakra-ui/react";

function MobileFooter(props) {
  return (
    <div>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        sx={{
          backgroundColor: "#2EACAC",
          py: 4,
          px: 6,
          color: "white",
        }}
      >
        <Text fontWeight={200} fontSize={11} letterSpacing={1.5}>
          ©2023 Zamboanga City Medical Center. All Rights Reserved
        </Text>
        <Box display="flex" gap={4} fontSize={10}>
          <Link>Privacy Policy</Link>
          <Link>Cookie Policy</Link>
        </Box>
      </Flex>
    </div>
  );
}

export default MobileFooter;
