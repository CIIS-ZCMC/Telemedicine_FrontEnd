import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { IoVideocam } from "react-icons/io5";
import { socket } from "../../API/socket_connection";
import PropTypes from "prop-types";

const VideoButton = ({ caseId }) => {
  const [hasCall, setHasCall] = useState(false);

  const openVideoCallWindow = () => {
    const url = `http://192.168.137.188:5173/room/${encodeURIComponent(
      caseId
    )}`;
    const width = window.innerWidth * 0.6;
    const height = window.innerHeight * 0.7;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const windowFeatures = `width=${width},height=${height},top=${top},left=${left},resizable,scrollbars=yes`;
    window.open(url, "_blank", windowFeatures);
  };

  useEffect(() => {
    // socket.on("activeCall", (data) => {
    //   if (data !== null && data !== undefined && data) {
    //     setHasCall(true);
    //   }
    // });
  }, []);

  return (
    <Button
      bg="transparent"
      _hover={{ bg: "transparent", transform: "scale(1.2,1.2)" }}
      color={hasCall ? "red" : "teal"}
      onClick={() => openVideoCallWindow()}
    >
      <IoVideocam size={35} />
    </Button>
  );
};

VideoButton.propTypes = {
  caseId: PropTypes.number,
};

export default VideoButton;
