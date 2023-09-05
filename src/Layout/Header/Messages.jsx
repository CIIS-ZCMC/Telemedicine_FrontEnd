import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  IconButton,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import moment from "moment";
import { FixedSizeList as List } from "react-window";
import { BiMessageDetail } from "react-icons/bi";
import PropTypes from "prop-types";

const MessagesCard = ({ url, name, title, description, date }) => {
  return (
    <>
      <Flex alignItems="center" gap={4} pr={2}>
        <Avatar src={url} name={name} size="sm" />
        <Box bg="white" p={1} cursor="pointer">
          <Flex justifyContent="space-between">
            <Heading size="sm">{title}</Heading>
            <Text fontSize={10}>{moment(date).fromNow()}</Text>
          </Flex>
          <Box mt={2}>
            <Text fontSize={12}>{description}</Text>
          </Box>
        </Box>
      </Flex>
      <Divider stroke={2} />
    </>
  );
};

MessagesCard.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.object,
};

const Messages = () => {
  const messagesStyle = [
    {
      title: "New Message Recieved",
      description: "Marupok Center register new case for internal medicine",
      date: "2023-08-23",
    },
    {
      title: "New Message Recieved",
      description: "Marupok Center register new case for internal medicine",
      date: "2023-08-23",
    },
    {
      title: "New Message Recieved",
      description: "Marupok Center register new case for internal medicine",
      date: "2023-08-23",
    },
    {
      title: "New Message Recieved",
      description: "Marupok Center register new case for internal medicine",
      date: "2023-08-23",
    },
    {
      title: "New Message Recieved",
      description: "Marupok Center register new case for internal medicine",
      date: "2023-08-23",
    },
    {
      title: "New Message Recieved",
      description: "Marupok Center register new case for internal medicine",
      date: "2023-08-23",
    },
    {
      title: "New Message Recieved",
      description: "Marupok Center register new case for internal medicine",
      date: "2023-08-23",
    },
    {
      title: "New Message Recieved",
      description: "Marupok Center register new case for internal medicine",
      date: "2023-08-23",
    },
    {
      title: "New Message Recieved",
      description: "Marupok Center register new case for internal medicine",
      date: "2023-08-23",
    },
  ];

  const badgeStyle = {
    value: messagesStyle.length,
    btnColor: "blackAlpha.700",
    btnBgColor: "teal",
    hoverColor: "teal",
  };

  const Row = ({ index, style }) => {
    const value = messagesStyle[index];

    return (
      <div style={style}>
        <MessagesCard key={index} {...value} />
      </div>
    );
  };

  Row.propTypes = {
    index: PropTypes.number,
    style: PropTypes.object,
  };

  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <IconButton
          bg={"transparent"}
          color={badgeStyle.btnColor}
          _hover={{
            bg: "transparent",
            color: badgeStyle.btnBgColor,
            transform: "scale(1.2, 1.2)",
            "& #badge-text-element": {
              bg: badgeStyle.hoverColor,
            },
          }}
          icon={
            <Box position="relative">
              <Box
                id="badge-text-element"
                w="1.2rem"
                h="1.2rem"
                borderRadius={25}
                bg={badgeStyle.btnBgColor}
                position="absolute"
                color="white"
                top={-1}
                right={-3}
                boxShadow="md"
                p={1}
              >
                <Text fontSize={10} fontWeight={800}>
                  {badgeStyle.value}
                </Text>
              </Box>
              <BiMessageDetail size={24} />
            </Box>
          }
        />
      </PopoverTrigger>

      <PopoverContent w="22rem">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <Heading size="md" color="teal">
            Messages
          </Heading>
        </PopoverHeader>
        <PopoverBody>
          <List
            height={380}
            itemCount={messagesStyle.length}
            itemSize={80}
            width="21rem"
          >
            {Row}
          </List>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Messages;
