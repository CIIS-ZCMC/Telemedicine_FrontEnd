import { Box, Center, Image, Flex, Text, Heading } from "@chakra-ui/react";
import logo from "../../assets/zcmc_logo.png";
import PropTypes from "prop-types";

const AuthHeader = ({ title }) => {
  return (
    <Box h={"20%"}>
      <Center h="100%">
        <Flex w="100%" columnGap={5}>
          <Box>
            <Image
              w={["50px", "50px", "60px", "60px"]}
              h={["70px", "70px", "80px", "80px"]}
              src={logo}
            />
          </Box>
          <Box mt={[3, 3, 4, 4]}>
            <Flex direction={"column"} justifyContent={"end"}>
              <Heading size={["md", "md", "lg", "lg"]} color="teal">
                {title}
              </Heading>
              <Text fontSize={[12, 12, 14, 14]} color="gray">
                Enter your credentials to continue.
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Center>
    </Box>
  );
};

AuthHeader.propTypes = {
  title: PropTypes.string,
};

export default AuthHeader;
