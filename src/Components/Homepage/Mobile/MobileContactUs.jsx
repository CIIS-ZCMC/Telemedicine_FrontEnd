import React from "react";
import TitleHeader from "../TitleHeader";
import {
  Box,
  Container,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import logo from "../../../assets/telemed_logo.png";
import MobileFooter from "./MobileFooter";

function MobileContactUs(props) {
  return (
    <div>
      <Box>
        <TitleHeader title="Contact Us" />
      </Box>
      <HStack gap={5} justifyContent="center" p={5}>
        <Box
          width="40%"
          display="flex"
          gap={5}
          alignItems="center"
          justifyContent="center"
        >
          <Box>
            <img src={logo} width={50} />
          </Box>
          <Box>
            <Text fontWeight={600} fontSize={13}>
              REGIONAL TELEMEDICINE CENTER
            </Text>
            <Text fontSize={13}>Zamboanga City Medical Center</Text>
          </Box>
        </Box>
        <Box width="25%">
          <Text fontSize={12}>Contact Info:</Text>

          <Text fontWeight={600} fontSize={12} color="#005858">
            zcmcregionaltelemedicine@gmail.com
          </Text>
        </Box>
        <Box width="25%">
          <Text fontSize={12}>Address:</Text>
          <Text fontWeight={600} fontSize={12} color="#005858">
            Dr. D. Evangelista St., Sta. Catalina Road, Zamboanga City
          </Text>
        </Box>
      </HStack>
    </div>
  );
}

export default MobileContactUs;
