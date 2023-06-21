import { Divider, Flex, Image, Text, VStack } from "@chakra-ui/react";
import zcmc_logo from "../../assets/zcmc_logo.png";
import React from "react";

function LogoHeader(props) {
  return (
    <div>
      <Flex alignItems="center" align={"left"}>
        <Image src={zcmc_logo} height={12} alt="ZCMC logo" />

        <VStack lineHeight={0.4} align="left" ml={3}>
          <Text
            textTransform="uppercase"
            letterSpacing={3}
            fontWeight={600}
            color="teal"
            fontSize={14}
          >
            Telemedicine
          </Text>
          <Divider />
          <Text fontSize={12} fontWeight={500}>
            Zamboanga City Medical Center
          </Text>
        </VStack>
      </Flex>
    </div>
  );
}

export default LogoHeader;
