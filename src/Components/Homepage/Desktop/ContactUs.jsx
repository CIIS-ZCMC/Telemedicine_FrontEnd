import React from "react";
import TitleHeader from "../TitleHeader";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import logo from "../../../assets/telemed_logo.png";
import { HiLocationMarker, HiMail, HiUserGroup } from "react-icons/hi";
import zcmc from "../../../assets/zcmc_loc.png";

const contactInfo = [
  {
    icon: <img src={logo} width={70} />,
    content: (
      <>
        <Text fontWeight={600} fontSize={14}>
          REGIONAL TELEMEDICINE CENTER
        </Text>
        <Text fontSize={13}>Zamboanga City Medical Center</Text>
      </>
    ),
  },
  {
    icon: <HiMail fontSize={40} color="#178E8E" />,
    content: (
      <>
        <Text fontSize={13} fontWeight={600}>
          Email Us
        </Text>

        <Text fontWeight={600} fontSize={14} color="#005858" pt={3}>
          zcmcregionaltelemedicine@gmail.com
        </Text>
      </>
    ),
  },
  {
    icon: <HiLocationMarker fontSize={40} color="#178E8E" />,
    content: (
      <>
        <Text fontSize={13} fontWeight={600}>
          Visit Us
        </Text>
        <Text fontWeight={600} fontSize={14} color="#005858" pt={3}>
          Dr. D. Evangelista St., Sta. Catalina Road, Zamboanga City
        </Text>
      </>
    ),
  },
];

function ContactUs(props) {
  return (
    <div>
      <Box>
        <TitleHeader title="Contact Us" sub_title="Connect With Us" />
      </Box>
      <Flex px={20} pt={10} justifyContent="center">
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            backgroundColor: "white",
            padding: 10,
            borderRadius: 10,
            boxShadow: "rgba(0, 0, 0, 0.2) 0px 2px 8px 0px",
          }}
        >
          <Box>
            <img src={zcmc} width={500} style={{ borderRadius: 10 }} />
          </Box>
          <VStack pl={2} gap={3}>
            {/* <Box
              width="full"
              display="flex"
              gap={5}
              alignItems="center"
              mb={10}
              p={5}
            >
              <Box>
                <img src={logo} width={80} />
              </Box>
              <Box>
                <Text fontWeight={600} fontSize={15}>
                  REGIONAL TELEMEDICINE CENTER
                </Text>
                <Text fontSize={14}>Zamboanga City Medical Center</Text>
              </Box>
            </Box> */}
            {contactInfo.map((info) => {
              return (
                <>
                  <Box
                    // bgColor="white"
                    bgColor="#d2f3f3"
                    p={5}
                    width="full"
                    borderRadius={10}
                    key={info.content.toString()}
                    boxShadow="base"
                  >
                    <Box mb={3} align="left">
                      {info.icon}
                    </Box>
                    {info.content}
                  </Box>
                </>
              );
            })}
          </VStack>
        </div>
      </Flex>
    </div>
  );
}

export default ContactUs;
