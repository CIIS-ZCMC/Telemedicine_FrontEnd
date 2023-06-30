import React from "react";
import TitleHeader from "../TitleHeader";
import {
  Box,
  Container,
  HStack,
  IconButton,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import logo from "../../../assets/telemed_logo.png";
import { HiLocationMarker, HiMail, HiUserGroup } from "react-icons/hi";
import MobileFooter from "./MobileFooter";

const contactInfo = [
  {
    width: "45%",
    icon: <img src={logo} width={60} />,
    content: (
      <>
        <Text fontWeight={600} fontSize={13}>
          REGIONAL TELEMEDICINE CENTER
        </Text>
        <Text fontSize={13}>Zamboanga City Medical Center</Text>
      </>
    ),
  },
  {
    width: "25%",
    icon: <HiMail fontSize={30} color="#2EACAC" />,
    content: (
      <>
        <Text fontSize={12} fontWeight={600}>
          Email Us
        </Text>

        <Text fontWeight={600} fontSize={11} color="#005858" pt={5}>
          zcmcregionaltelemedicine@gmail.com
        </Text>
      </>
    ),
  },
  {
    width: "30%",
    icon: <HiLocationMarker fontSize={30} color="#2EACAC" />,
    content: (
      <>
        <Text fontSize={12} fontWeight={600}>
          Visit Us
        </Text>
        <Text fontWeight={600} fontSize={11} color="#005858" pt={5}>
          Dr. D. Evangelista St., Sta. Catalina Road, Zamboanga City
        </Text>
      </>
    ),
  },
];

function MobileContactUs(props) {
  const stack = useBreakpointValue({
    base: "block",
    sm: "flex",
    md: "flex",
    lg: "flex",
  });

  const padding = useBreakpointValue({ base: 10, sm: 10, md: 40, lg: 40 });

  return (
    <div>
      <Box>
        <TitleHeader title="Contact Us" sub_title="Connect With Us" />
      </Box>
      <Box
        display={stack}
        px={padding}
        py={10}
        justifyContent="space-between"
        gap={3}
      >
        {contactInfo.map((info) => {
          return (
            <>
              <Box
                // bgColor="white"
                bgColor="#d2f3f3"
                p={3}
                borderRadius={10}
                key={info.content.toString()}
                boxShadow="base"
                width={stack === "block" ? "full" : info.width}
                mt={stack === "block" ? 3 : 0}
              >
                <Box mb={2} align="left">
                  {info.icon}
                </Box>
                {info.content}
              </Box>
            </>
          );
        })}
      </Box>
    </div>
  );
}

export default MobileContactUs;
