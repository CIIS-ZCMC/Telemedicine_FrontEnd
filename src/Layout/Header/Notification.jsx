import {
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
import { BsBell } from "react-icons/bs";
import PropTypes from "prop-types";

const NotificationCard = ({ title, description, date }) => {
  return (
    <>
      <Box bg="white" p={1} cursor="pointer">
        <Flex justifyContent="space-between">
          <Heading size="sm">{title}</Heading>
          <Text fontSize={10}>{moment(date).fromNow()}</Text>
        </Flex>
        <Box mt={2}>
          <Text fontSize={12}>{description}</Text>
        </Box>
      </Box>
      <Divider stroke={2} />
    </>
  );
};

NotificationCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.object,
};

const Notification = () => {
  const notificationStyle = [
    {
      title: "New Case Recieved",
      description: "Marupok Center register new case for internal medicine",
      date: "2023-08-23",
    },
    {
      title: "New Case Recieved",
      description: "Marupok Center register new case for internal medicine",
      date: "2023-08-23",
    },
    {
      title: "New Case Recieved",
      description: "Marupok Center register new case for internal medicine",
      date: "2023-08-23",
    },
    {
      title: "New Case Recieved",
      description: "Marupok Center register new case for internal medicine",
      date: "2023-08-23",
    },
    {
      title: "New Case Recieved",
      description: "Marupok Center register new case for internal medicine",
      date: "2023-08-23",
    },
    {
      title: "New Case Recieved",
      description: "Marupok Center register new case for internal medicine",
      date: "2023-08-23",
    },
    {
      title: "New Case Recieved",
      description: "Marupok Center register new case for internal medicine",
      date: "2023-08-23",
    },
    {
      title: "New Case Recieved",
      description: "Marupok Center register new case for internal medicine",
      date: "2023-08-23",
    },
    {
      title: "New Case Recieved",
      description: "Marupok Center register new case for internal medicine",
      date: "2023-08-23",
    },
    {
      title: "New Case Recieved",
      description: "Marupok Center register new case for internal medicine",
      date: "2023-08-23",
    },
  ];

  const badgeStyle = {
    value: 10,
    btnColor: "blackAlpha.700",
    btnBgColor: "orange",
    hoverColor: "orange",
  };

  const Row = ({ index, style }) => {
    const value = notificationStyle[index];

    return (
      <div style={style}>
        <NotificationCard key={index} {...value} />
      </div>
    );
  };

  Row.propTypes = {
    index: PropTypes.number,
    style: PropTypes.object,
  };

  return (
    <Popover>
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
              <BsBell size={24} />
            </Box>
          }
        />
      </PopoverTrigger>

      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <Heading size="md" color="teal">
            Notification
          </Heading>
        </PopoverHeader>
        <PopoverBody>
          <List
            height={280}
            itemCount={notificationStyle.length}
            itemSize={80}
            width="19rem"
          >
            {Row}
          </List>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Notification;
