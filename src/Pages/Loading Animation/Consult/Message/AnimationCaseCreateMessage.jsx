import { Box, Button, Textarea, Flex } from "@chakra-ui/react";
import "../../../../Style/Consult.css";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { IoMdAddCircle, IoMdSend } from "react-icons/io";

const AnimationCaseCreateMessage = () => {
  return (
    <Box>
      {/* <Files selectedFiles={selectedFiles} /> */}
      <Box
        w="100%"
        h={["5rem", "5rem", "7.8rem", "4.8rem"]}
        display="flex"
        flexDirection="column"
      >
        <Box
          w={["100%", "100%", "100%", "40%"]}
          h={[`3rem`, "3rem", "4rem", `5rem`]}
          bg="white"
          p={2}
          bottom="0%"
          position="fixed"
          display="flex"
          columnGap={5}
          boxShadow="lg"
          alignItems="center"
          className="message"
          overflow="hidden"
        >
          <Flex>
            <Button
              bg="transparent"
              color="gray"
              w={[40, 50, 100, 100]}
              rounded={100}
              _hover={{
                bg: "transparent",
              }}
              _active={{
                bg: "transparent",
              }}
              className="message-button-plus"
              onClick={() => {}}
            >
              <BsFillCameraVideoFill size={30} />
            </Button>
            <Button
              bg="transparent"
              color="gray"
              w={[40, 50, 100, 100]}
              rounded={100}
              _hover={{
                bg: "transparent",
              }}
              _active={{
                bg: "transparent",
              }}
              className="message-button-plus"
              onClick={() => {
                document.getElementById("file").click();
              }}
            >
              <IoMdAddCircle size={30} />
            </Button>
          </Flex>
          <Textarea
            backgroundColor="rgb(243, 242, 242)"
            focusBorderColor="white"
            placeholder="Type here."
            size="lg"
            variant="flushed"
            p={5}
            rounded={30}
            style={{ height: `100%` }}
            rows={1}
            resize="none"
            overflow="hidden"
          />
          <Button
            leftIcon={<IoMdSend size={30} />}
            bg="transparent"
            w={[50, 50, 100, 100]}
            color={"green"}
            rounded={100}
            pr={5}
            _hover={{
              bg: "transparent",
            }}
            _active={{
              bg: "transparent",
            }}
            className="message-button-send"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AnimationCaseCreateMessage;
