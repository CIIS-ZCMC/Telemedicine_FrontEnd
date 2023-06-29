import React from "react";
import TitleHeader from "../TitleHeader";
import { Box, Container, HStack, IconButton, Text } from "@chakra-ui/react";
import Footer from "./Footer";
import logo from "../../../assets/telemed_logo.png";

function ContactUs(props) {
  return (
    <div>
      <Box>
        <TitleHeader title="Contact Us" sub_title="Connect With Us" />
      </Box>
      <HStack px={5} gap={10} py={5} justifyContent="center">
        <Box display="flex" gap={5} alignItems="center">
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
        <Box>
          <Text fontSize={14}>Contact Info:</Text>

          <Text fontWeight={600} fontSize={14} color="#005858">
            zcmcregionaltelemedicine@gmail.com
          </Text>
        </Box>
        <Box>
          <Text fontSize={14}>Address:</Text>
          <Text fontWeight={600} fontSize={14} color="#005858">
            Dr. D. Evangelista St., Sta. Catalina Road, Zamboanga City
          </Text>
        </Box>
      </HStack>

      <Footer />
    </div>
  );
}

export default ContactUs;
