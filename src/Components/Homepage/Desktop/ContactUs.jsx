import React from "react";
import TitleHeader from "../TitleHeader";
import { Box, HStack, IconButton, Text } from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";

function ContactUs(props) {
  return (
    <div>
      <Box>
        <TitleHeader title="Contact Us" />
      </Box>
      <HStack px={5} gap={20} py={5} justifyContent="center">
        <Box display="flex" gap={5} alignItems="center">
          <Box>
            <IconButton icon={<BiSearch />} />
          </Box>
          <Box>
            <Text fontWeight={600} fontSize={18}>
              REGIONAL TELEMEDICINE CENTER
            </Text>
            <Text fontSize={15}>Zamboanga City Medical Center</Text>
          </Box>
        </Box>
        <Box>
          <Text fontSize={14}>Contact Info:</Text>
          <Text fontWeight={600} fontSize={15} color="#005858">
            zcmcregionaltelemedicine@gmail.com
          </Text>
        </Box>
        <Box>
          <Text fontSize={14}>Address:</Text>
          <Text fontWeight={600} fontSize={15} color="#005858">
            Dr. D. Evangelista St., Sta. Catalina Road, Zamboanga City
          </Text>
        </Box>
      </HStack>
    </div>
  );
}

export default ContactUs;
