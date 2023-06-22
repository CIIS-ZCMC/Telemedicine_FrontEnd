import { Box, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";

function Footer(props) {
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
          borderRadius: 5,
        }}
      >
        <Text fontWeight={200} fontSize={13} letterSpacing={1.5}>
          ©2023 Zamboanga City Medical Center. All Rights Reserved
        </Text>
        <Box display="flex" gap={4} fontSize={13}>
          <Link>Privacy Policy</Link>
          <Link>Cookie Policy</Link>
        </Box>
      </Flex>
    </div>
  );
}

export default Footer;
