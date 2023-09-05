import {
  Box,
  Center,
  Flex,
  Text,
  Heading,
  Skeleton,
  IconButton,
  Input,
  Image,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import useMyChat from "../../Hooks/MyChatHook";
import { FixedSizeList as List } from "react-window";
import NoResultFound from "../../assets/Vector/no-result.png";
import PropTypes from "prop-types";
import moment from "moment/moment";

const CardSkeleton = () => {
  return (
    <Box w="100%" h="10rem" rounded={10} bg="white" boxShadow="md" p={5} mt={5}>
      <Flex justifyContent="space-between" mb={2}>
        <Skeleton w="10rem" h="10px" />
        <Skeleton w="5rem" h="10px" />
      </Flex>
      <Box h="6rem" pt={2} rounded={5}>
        <Skeleton h="inherit" p={2} height="inherit" />
      </Box>
    </Box>
  );
};

const Card = ({ hospital, date, message }) => {
  let data = "";
  let messageWithLineBreaks = null;

  if (message.includes("%0A")) {
    data = decodeURIComponent(message);
    message = data.replace(/%0A/g, "\n");

    messageWithLineBreaks = message.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br /> {/* Add a line break */}
      </React.Fragment>
    ));
  }

  return (
    <Box
      w="30rem"
      h="10rem"
      rounded={10}
      bg="white"
      boxShadow="md"
      p={5}
      mt={5}
    >
      <Flex justifyContent="space-between" mb={2}>
        <Text fontSize={12} fontWeight={600}>
          {hospital}
        </Text>
        <Text fontSize={12} fontWeight={600}>
          {moment(date).format("MMMM DD, YYYY")}
        </Text>
      </Flex>
      <Box h="6rem" p={2} rounded={5} bg="rgba(0,0,0,0.1)" overflow="hidden">
        <Text fontSize={14}>{messageWithLineBreaks ?? message}</Text>
      </Box>
    </Box>
  );
};

Card.propTypes = {
  hospital: PropTypes.string,
  date: PropTypes.object,
  message: PropTypes.string,
};

const SortComponent = () => {
  const { ascending, sort } = useMyChat();

  return (
    <IconButton
      bg="transparent"
      rounded="100%"
      _hover={{ transform: "scale(1.2,1.2)" }}
      onClick={() => sort()}
    >
      {ascending ? (
        <TbSortAscending size={25} />
      ) : (
        <TbSortDescending size={25} />
      )}
    </IconButton>
  );
};

const Container = ({ value, setValue, children }) => {
  return (
    <Box w="inherit" height="100%" overflow="hidden">
      <Flex
        h="3rem"
        pl={5}
        pt={3}
        pr={5}
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading size="md">My Chats</Heading>
        <Flex alignItems="center" columnGap={2}>
          <Input
            maxWidth="15rem"
            size="sm"
            placeholder="Search Hospital"
            focusBorderColor="teal"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <SortComponent />
        </Flex>
      </Flex>
      {children}
    </Box>
  );
};

Container.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
  children: PropTypes.object,
};

const NoMessageContainer = () => {
  return (
    <Center
      h="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Box w="60%" h="45%">
        <Image src={NoResultFound} />
      </Box>
      <Text fontSize={24} fontWeight={600} color="blackAlpha.700">
        No Message Found.
      </Text>
    </Center>
  );
};

const ProfileMyChats = () => {
  const { ascending, myChats } = useMyChat();
  const [loading, setIsLoading] = useState(myChats.length === 0);
  const [search, setSearch] = useState("");
  const { getMyChats } = useMyChat();

  function fetchChats() {
    getMyChats((status, feedback) => {
      switch (status) {
        case 200:
          setIsLoading(false);
          break;
        default:
          console.log(feedback);
      }
    });
  }

  const filter = () =>
    myChats.filter((chat) =>
      chat.hospital
        .toLocaleLowerCase()
        .includes(search.trim().toLocaleLowerCase())
    );

  const sort = () => [
    ...myChats.sort((a, b) => (ascending ? b.id - a.id : a.id - b.id)),
  ];

  const Row = ({ index, style }) => {
    const value = search === "" ? sort()[index] : filter()[index];

    return (
      <div style={style}>
        <Card key={index} {...value} />
      </div>
    );
  };

  Row.propTypes = {
    index: PropTypes.number,
    style: PropTypes.object,
  };

  useEffect(() => {
    if (loading && myChats.length === 0) {
      fetchChats();
    }

    return () => setIsLoading(false);
  }, []);

  if (loading) {
    return (
      <Container>
        <Box w="inherit" height="100%" overflow="hidden" p={5}>
          {[1, 2, 3, 4, 5].map((index) => (
            <CardSkeleton key={index} />
          ))}
        </Box>
      </Container>
    );
  }

  return (
    <Container value={search} setValue={setSearch}>
      <Box
        w="inherit"
        height="92%"
        overflow="auto"
        p={5}
        transition="0.2s ease"
      >
        {search !== "" && filter().length === 0 ? (
          <NoMessageContainer />
        ) : (
          <List
            height={680}
            itemCount={search === "" ? sort().length : filter().length}
            itemSize={170}
            width="30.7rem"
          >
            {Row}
          </List>
        )}
      </Box>
    </Container>
  );
};

export default ProfileMyChats;
