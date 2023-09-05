import { useState } from "react";
import { Box, Button, Textarea, useToast, Flex } from "@chakra-ui/react";
import { IoMdAddCircle, IoMdSend } from "react-icons/io";
import { toastposition, toastvariant } from "../../Pages/Packages";
import { PostRequest } from "../../Services/api";
import { Message } from "../../Services/Paths";
import "../../Style/Consult.css";
import Files from "../Files";
// import { BsFillCameraVideoFill } from "react-icons/bs";
import PropTypes from "prop-types";

const CaseCreateMessage = ({ id, setFetchMessage }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [lines, setLines] = useState(1);
  const toast = useToast();
  const Max_Count = 5;

  const handleFileUpload = (files) => {
    const uploaded = [...selectedFiles];
    let limitExceeded = false;

    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length > Max_Count) {
          limitExceeded = true;
          return true;
        }
      }
    });

    if (!limitExceeded) {
      setSelectedFiles(uploaded);
      if (message === "" || message == null) {
        setMessage("File Attacthments");
      }
    }
  };

  const onChange = (e) => {
    const value = e.target.value;

    const totalLines = value.split("\n");
    setLines(totalLines.length);

    setMessage(value);
  };

  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);

    // Process each chosen file
    chosenFiles.forEach((file) => {
      const reader = new FileReader();

      // FileReader onload event handler
      reader.onload = (event) => {
        const filePath = event.target.result;
        console.log(filePath);
        // Perform further processing or upload the file with the complete path
      };

      // Read the file as data URL
      reader.readAsDataURL(file);
    });

    handleFileUpload(chosenFiles);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message === "" && selectedFiles.length === 0) {
      console.log("exit early");
      return;
    }

    let bodyform = new FormData();

    selectedFiles.forEach((element, key) => {
      bodyform.append("attachments[]", element, key);
    });

    bodyform.append("message", encodeURIComponent(message));
    bodyform.append("FK_cases_ID", id);

    PostRequest({ url: Message }, bodyform)
      .then((res) => {
        if (!res.statusText === "OK") {
          throw new Error("Bad response.", { cause: res });
        }
        toast({
          title: "Response Sent Successfully!",
          position: toastposition,
          variant: toastvariant,
          status: "success",
          isClosable: true,
        });
        setSelectedFiles([]);
        setMessage("");
        setFetchMessage(true);
        setLines(1);
      })
      .catch((err) => {
        switch (err) {
          case 400:
            console.log("Can't complete process. Try again later.");
            break;
          default:
            console.log("Can't upload rigth now. try again later.");
            break;
        }
        // toast({
        //   title: messageErr,
        //   position: toastposition,
        //   variant: toastvariant,
        //   status: "error",
        //   isClosable: true,
        // });
      });
  };

  return (
    <Box>
      <Files
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
      />
      <Box
        w="100%"
        h={["5rem", "5rem", "7.8rem", "4.8rem"]}
        display="flex"
        flexDirection="column"
      >
        <Box
          w={["100%", "100%", "100%", "40%"]}
          h={[`3rem`, "3rem", "4rem", `${lines * 2 + 6}%`]}
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
            <Box ml={5}>
              <IoMdAddCircle
                color="gray"
                size={35}
                onClick={() => {
                  document.getElementById("file").click();
                }}
              />
            </Box>
            <input
              type={"file"}
              id="file"
              name="image"
              style={{ display: "none" }}
              multiple={true}
              onChange={handleFileEvent}
            />
          </Flex>
          <Textarea
            backgroundColor="rgb(243, 242, 242)"
            focusBorderColor="white"
            placeholder="Type here."
            size="lg"
            variant="flushed"
            p={5}
            rounded={30}
            value={message}
            style={{ height: `100%` }}
            onChange={(e) => onChange(e)}
            rows={lines}
            resize="none"
            overflow="hidden"
          />
          <Button
            bg="transparent"
            w={[50, 50, 100, 100]}
            color={!!message || selectedFiles.length !== 0 ? "green" : "gray"}
            rounded={100}
            pr={5}
            _hover={{
              bg: "transparent",
            }}
            _active={{
              bg: "transparent",
            }}
            mr={5}
            onClick={(e) => handleSendMessage(e)}
          >
            <IoMdSend size={30} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

CaseCreateMessage.propTypes = {
  id: PropTypes.number,
  setFetchMessage: PropTypes.bool,
};

export default CaseCreateMessage;
