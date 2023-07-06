import { useEffect, useRef, useState } from "react";
import { Box, Flex, IconButton } from "@chakra-ui/react";
// import { socket } from "../../API/socket_connection";
import { HiVideoCameraSlash, HiVideoCamera } from "react-icons/hi2";
import { AiFillAudio, AiOutlineAudioMuted } from "react-icons/ai";
import { IoCall } from "react-icons/io5";
import { useParams } from "react-router-dom";
import AgoraRTM from "agora-rtm-sdk";

const VideoCall = () => {
  const APP_ID = "8bd76e2530884e51bce45d79b862c431";
  let token = null;
  const uid = `${Math.floor(Math.random() * 10000)}`;

  const { id } = useParams();
  const roomId = decodeURIComponent(id);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  // const socketRef = useRef(null);

  const [isVideoRunning, setIsVideoRunning] = useState(true);
  const [isAudioRunning, setIsAudioRunning] = useState(true);

  const [hidden, setHidden] = useState("none");

  let client;
  let channel;

  let localStream;
  let remoteStream;
  let peerConnection;

  const width = window.innerWidth;
  const height = window.innerHeight;

  const servers = {
    iceServers: [
      {
        urls: ["stun:stun.l.google.com:19302", "stun:stun3.l.google.com:19302"],
      },
    ],
  };

  let constraints = {
    video: {
      width: { min: width * 0.5, ideal: width, max: width },
      height: { min: height * 0.4, ideal: height, max: height },
    },
    audio: true,
  };

  let init = async () => {
    client = AgoraRTM.createInstance(APP_ID);
    await client.login({ uid, token });

    //Room ID here
    channel = client.createChannel(roomId);

    await channel.join();

    channel.on("MemberJoined", handleUserJoined);
    channel.on("MemberLeft", handleUserLeft);
    client.on("MessageFromPeer", handleMessageFromPeer);

    localStream = await navigator.mediaDevices.getUserMedia(constraints);
    localVideoRef.current.srcObject = localStream;
  };

  let createPeerConnection = async (MemberId) => {
    peerConnection = new RTCPeerConnection(servers);

    remoteStream = new MediaStream();
    remoteVideoRef.current.srcObject = remoteStream;
    setHidden("block");

    if (!localStream) {
      localStream = await navigator.mediaDevices.getUserMedia(constraints);
      localVideoRef.current.srcObject = localStream;
    }

    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });

    peerConnection.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
        console.log("Remote Stream add Track Success");
      });
    };

    peerConnection.onicecandidate = async (event) => {
      if (event.candidate) {
        console.log("new Ice Candidate: ", event.candidate);
        client.sendMessageToPeer(
          {
            text: JSON.stringify({
              type: "candidate",
              candidate: event.candidate,
            }),
          },
          MemberId
        );
      }
    };
  };

  let createOffer = async (MemberId) => {
    await createPeerConnection(MemberId);

    let offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    console.log("Offer: ", offer);

    client.sendMessageToPeer(
      { text: JSON.stringify({ type: "offer", offer: offer }) },
      MemberId
    );
  };

  let createAnswer = async (MemberId, offer) => {
    try {
      console.log("create Answer function display: ", offer);
      await createPeerConnection(MemberId);

      await peerConnection.setRemoteDescription(offer);

      let answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);

      console.log("Answer: ", answer);

      client.sendMessageToPeer(
        {
          text: JSON.stringify({ type: "answer", answer: answer }),
        },
        MemberId
      );
    } catch (err) {
      console.log(`Error in line 131: ${err}`);
    }
  };

  let handleUserJoined = async (MemberId) => {
    createOffer(MemberId);
  };

  //handleUserLeft = (MemberId)=>{};
  let handleUserLeft = () => {
    setHidden("none");
  };

  let leaveChannel = async () => {
    await channel.leave();
    await client.logout();
  };

  const handleMessageFromPeer = async (message, MemberId) => {
    message = JSON.parse(message.text);

    if (message.type === "offer") {
      createAnswer(MemberId, message.offer);
    }

    if (message.type === "answer") {
      console.log(`Calling addAnswer: [OFFER] ${message.answer}`);
      addAnswer(message.answer);
    }

    if (message.type === "candidate") {
      if (peerConnection) {
        peerConnection.addIceCandidate(message.candidate);
      }
    }
  };

  let addAnswer = async (answer) => {
    try {
      if (!peerConnection.currentRemoteDescription) {
        peerConnection.setRemoteDescription(answer);
        return;
      }
      console.log("remote description failed to add");
    } catch (err) {
      console.log(`Error line 178: ${err}`);
    }
  };

  let toggleCamera = async () => {
    if (localVideoRef.current) {
      const videoElement = localVideoRef.current;
      const videoTrack = videoElement.srcObject?.getVideoTracks()[0];

      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoRunning(videoTrack.enabled);
      }
    }
  };

  let toggleMic = async () => {
    if (localVideoRef.current) {
      const audioElement = localVideoRef.current;
      const audioTrack = audioElement.srcObject?.getAudioTracks()[0];

      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioRunning(audioTrack.enabled);
      }
    }
  };

  window.addEventListener("beforeunload", leaveChannel);

  useEffect(() => {
    init();
  }, []);

  return (
    <Box w="100%" h="100vh" position="relative">
      <Box
        w={hidden === "none" ? "100%" : "40%"}
        h={hidden === "none" ? "100vh" : "30vh"}
        position={"absolute"}
        transition={"ease-in-out"}
      >
        <video ref={localVideoRef} autoPlay playsInline />
      </Box>
      <Box display={hidden} w={"100%"} h={"100vh"} position={"absolute"}>
        <video ref={remoteVideoRef} autoPlay playsInline />
      </Box>
      <Box
        bottom={5}
        w="100%"
        position="absolute"
        color="white"
        display="flex"
        justifyContent="center"
      >
        <Box w={width * 0.3} h={20} bg="white" rounded={50} overflow="hidden">
          <Flex
            w="inheirt"
            h="inherit"
            justifyContent={"space-around"}
            alignItems={"center"}
          >
            <IconButton
              color={isVideoRunning ? "teal" : "Red"}
              rounded={50}
              size={"lg"}
              icon={
                isVideoRunning ? (
                  <HiVideoCamera size={30} />
                ) : (
                  <HiVideoCameraSlash size={30} />
                )
              }
              onClick={(e) => toggleCamera(e)}
            />
            <IconButton
              color={isAudioRunning ? "teal" : "Red"}
              rounded={50}
              size={"lg"}
              icon={
                isAudioRunning ? (
                  <AiFillAudio size={30} />
                ) : (
                  <AiOutlineAudioMuted size={30} />
                )
              }
              onClick={() => toggleMic()}
            />
            <IconButton
              color="red"
              rounded={100}
              p={2}
              size={"lg"}
              icon={<IoCall size={30} />}
              onClick={() => window.close()}
            />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoCall;
