import { useState } from "react";
import { Box, Button, Textarea, useToast } from "@chakra-ui/react";
import { IoMdAddCircle, IoMdSend } from "react-icons/io";
import { toastposition, toastvariant } from "../../Pages/Packages";
import { PostRequest } from "../../API/api";
import { Message } from "../../API/Paths";
import "../../Style/Consult.css";
import Files from "../Files";
import PropTypes from "prop-types";

const CaseCreateMessage = ({ id, setFetchMessage }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [message, setMessage] = useState("");
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

  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
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

    bodyform.append("message", message);
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
      })
      .catch((err) => {
        let messageErr = "";
        switch (err) {
          case 400:
            messageErr = "Can't complete process. Try again later.";
            break;
          default:
            messageErr = "Can't upload rigth now. try again later.";
            break;
        }
        toast({
          title: messageErr,
          position: toastposition,
          variant: toastvariant,
          status: "error",
          isClosable: true,
        });
      });
  };

  return (
    <Box>
      <Box
        w="100%"
        h={["5rem", "5rem", "7.8rem", "4.8rem"]}
        m={4}
        display="flex"
        flexDirection="column"
      >
        <Files selectedFiles={selectedFiles} />
        <Box
          w={["89%", "89%", "37%", "37%"]}
          h={["3rem", "3rem", "4rem", "4rem"]}
          bg="white"
          p={2}
          mr={4}
          mb={5}
          mt={2}
          bottom="0%"
          position="fixed"
          display="flex"
          columnGap={5}
          rounded={8}
          boxShadow="lg"
          alignItems="center"
          className="message"
          overflow="hidden"
        >
          <Button
            leftIcon={<IoMdAddCircle size={40} />}
            bg="transparent"
            color="gray"
            w={[50, 50, 100, 100]}
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
          />
          <input
            type={"file"}
            id="file"
            name="image"
            style={{ display: "none" }}
            multiple={true}
            onChange={handleFileEvent}
          />
          <Box
            h={message.includes("\n") ? "3rem" : "2rem"}
            className="message-input-container"
          >
            <Textarea
              size="sm"
              variant="flushed"
              placeholder="Type here."
              focusBorderColor="white"
              className="message-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Box>
          <Button
            leftIcon={<IoMdSend size={30} />}
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
            className="message-button-send"
            onClick={(e) => handleSendMessage(e)}
          />
        </Box>
      </Box>
    </Box>
  );
};

CaseCreateMessage.propTypes = {
  id: PropTypes.string,
  setFetchMessage: PropTypes.bool,
};

export default CaseCreateMessage;
