import { Box, Divider, Flex, HStack, Image, Text } from "@chakra-ui/react";
import doc_kunting from "../../../assets/doctor/doc_kunting.png";
import ButtonComponent from "../ButtonComponent";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const Headings = () => {
  return (
    <Box>
      <Text fontSize="3.5em" sx={{ fontWeight: "bolder" }} letterSpacing={1.5}>
        <span style={{ color: "#6DB39C" }}>Your </span>
        <span style={{ color: "#005858" }}>
          Path To <br />
          Convenient
        </span>{" "}
        <span style={{ color: "#6DB39C" }}>Care.</span>
      </Text>

      <HStack my={12}>
        <Divider
          orientation="vertical"
          sx={{
            height: 12,
            width: 1.5,
            marginRight: 2,
            backgroundColor: "#178E8E",
          }}
        />
        <Text
          fontSize="19px"
          letterSpacing={2}
          color="#436157"
          sx={{ fontWeight: "lighter" }}
        >
          Bringing specialty care to remote and <br />
          undeserved communities.
        </Text>
      </HStack>

      <ButtonComponent
        icon={<ArrowForwardIcon />}
        text="REFER A PATIENT"
        bgColor="#2EACAC"
        variant="solid"
        fontSize="18px"
        borderRadius={50}
        paddingY={6}
        paddingX={12}
      />
    </Box>
  );
};
function Banner() {
  return (
    <>
      <Flex justifyContent="space-around" alignItems="center">
        <Headings />
        <Box>
          <Image src={doc_kunting} width={430} />
        </Box>
      </Flex>
    </>
  );
}

export default Banner;
