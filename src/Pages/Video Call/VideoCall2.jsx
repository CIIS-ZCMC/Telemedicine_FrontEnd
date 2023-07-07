import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import AgoraRTM from "agora-rtm-sdk";
import adapter from "webrtc-adapter";

const VideoCall2 = () => {
  const APP_ID = "8bd76e2530884e51bce45d79b862c431";
  let token = null;
  const uid = `${Math.floor(Math.random() * 10000)}`;

  let client;
  let channel;

  let localStream;
  let remoteStream;
  let peerConnection;

  const servers = {
    iceServers: [
      {
        urls: [
          "stun:stun1.1.google.com:19302",
          "stun:stun2.1.google.com:19302",
        ],
      },
    ],
  };

  let init = async () => {
    client = AgoraRTM.createInstance(APP_ID);
    await client.login({ uid, token });

    channel = client.createChannel("main");
    await channel.join();

    channel.on("MemberJoined", handleUserJoined);

    client.on("MessageFromPeer", handleMessageFromPeer);

    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });

    document.getElementById("user-1").srcObject = localStream;
  };

  let handleMessageFromPeer = async (message, MemberId) => {
    message = JSON.parse(message.text);
    console.log("Message: ", message);
    console.log(`handleMessageFromPeer: ${MemberId}`);

    if (message.type === "offer") {
      await createAnswer(MemberId, message.offer);
    }

    if (message.type === "answer") {
      await addAnswer(message.answer);
      console.log("Answer Received: ", message.answer);
    }

    if (message.type === "candidate") {
      if (peerConnection) {
        peerConnection.addIceCandidate(message.candidate);
      }
    }
  };

  let handleUserJoined = async (MemberId) => {
    console.log("A new user joined the channel", MemberId);

    createOffer(MemberId);
  };

  let createPeerConnection = async (MemberId) => {
    peerConnection = new RTCPeerConnection(servers);

    remoteStream = new MediaStream();
    document.getElementById("user-2").srcObject = remoteStream;

    if (!localStream) {
      localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      document.getElementById("user-1").srcObject = localStream;
    }

    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });

    peerConnection.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    peerConnection.onicecandidate = async (event) => {
      if (event.candidate) {
        // console.log("New ICE CANDIDATE: ", event.candidate);
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

    peerConnection
      .createOffer()
      .then((offer) => {
        peerConnection.setLocalDescription(offer);
        return offer;
      })
      .then((offer) => {
        client.sendMessageToPeer(
          {
            text: JSON.stringify({
              type: "offer",
              offer: offer,
            }),
          },
          MemberId
        );

        console.log("Sending Offer: ", offer);
      })
      .catch((err) => {
        console.log(`Error in createOffer function: ${err}`);
      });
  };

  let createAnswer = async (MemberId, offer) => {
    console.log("Offer has been received: ", offer);
    await createPeerConnection(MemberId);
    await peerConnection.setRemoteDescription(offer);

    console.log("Adding answer in Asus: ", offer);
    peerConnection
      .createAnswer()
      .then(async (answer) => {
        peerConnection.setLocalDescription(answer);
        return answer;
      })
      .then((answer) => {
        client.sendMessageToPeer(
          {
            text: JSON.stringify({
              type: "answer",
              answer: answer,
            }),
          },
          MemberId
        );

        console.log("Sending answer FROM ASUS: ", answer);
      })
      .catch((err) => {
        console.log(`Error in createAnswer function: ${err}`);
      });
  };

  let addAnswer = async (answer) => {
    if (!peerConnection.currentRemoteDescription) {
      if (answer === null) {
        console.log("Answer is null");
      }
      peerConnection.setRemoteDescription(answer);
      console.log("Adding answer in Acer: ", answer);
    }
  };

  init();

  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr" gap="2rem">
      <video
        className="video-player"
        id="user-1"
        autoPlay
        playsInline
        muted
        style={{ backgroundColor: "black", width: "100%", height: "500px" }}
      />
      <video
        className="video-player"
        id="user-2"
        autoPlay
        playsInline
        muted
        style={{ backgroundColor: "black", width: "100%", height: "500px" }}
      />
    </Box>
  );
};

export default VideoCall2;
