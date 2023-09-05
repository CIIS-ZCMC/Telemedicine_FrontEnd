import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import {
  BsCalendar2Date,
  BsChatLeftText,
  BsGenderMale,
  BsGenderFemale,
} from "react-icons/bs";
import { FaBriefcaseMedical } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import male from "../../assets/male_default_profile.jpg";
import female from "../../assets/female_default_profile.jpg";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import PropTypes from "prop-types";

const ButtonComponent = ({ id, title, icon, callBack }) => {
  return (
    <Button
      onClick={(e) => callBack(e, id)}
      bg="transparent"
      columnGap={2}
      fontWeight={500}
      color="blackAlpha.700"
      _hover={{ transform: "scale(1.1,1.1)" }}
    >
      {icon}
      <Text fontSize={18}>{title}</Text>
    </Button>
  );
};

ButtonComponent.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  icon: PropTypes.object,
  callBack: PropTypes.func,
};

const CardComponent = ({
  id,
  hospital,
  date,
  name,
  age,
  sex,
  caseNo,
  status,
  style,
}) => {
  const navigate = useNavigate();

  const component = [
    {
      id: id,
      title: "Chats",
      icon: <BsChatLeftText color="lightblue" size={21} />,
      callBack: viewCase,
    },
    {
      id: id,
      title: "Call",
      icon: <FiPhoneCall color="#acd4cd" size={21} />,
      callBack: callCase,
    },
  ];

  function viewCase(e, id) {
    e.preventDefault(e);
    console.log("case id: ", id);
  }

  function callCase(e, id) {
    e.preventDefault(e);

    const url = `http://192.168.137.188:5173/room/${encodeURIComponent(id)}`;
    const width = window.innerWidth * 0.6;
    const height = window.innerHeight * 0.7;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const windowFeatures = `width=${width},height=${height},top=${top},left=${left},resizable,scrollbars=yes`;
    window.open(url, "_blank", windowFeatures);
  }

  function callBack(e, id) {
    e.preventDefault();
    console.log("navigate");
    navigate("/case-view", { state: id });
  }

  function elementIcon(title) {
    switch (title.toLocaleLowerCase()) {
      case "male":
        return <BsGenderMale color="blue" />;
      case "female":
        return <BsGenderFemale color="red" />;
      case "bod":
        return <BsCalendar2Date />;
      default:
        return <Text>404</Text>;
    }
  }

  const Element = ({ title, value }) => {
    if (title === "status")
      return (
        <Badge h={"1.1rem"} color={value === "Active" ? "green" : "gray"}>
          {value}
        </Badge>
      );

    return (
      <Flex alignItems="center" columnGap={2}>
        {elementIcon(title)}
        <Text>{value}</Text>
      </Flex>
    );
  };

  Element.propTypes = {
    title: PropTypes.string,
    value: PropTypes.number,
  };

  return (
    <Box style={style} cursor="pointer">
      <Box
        w="inherit"
        display="flex"
        justifyContent="space-between"
        ml={3}
        mr={3}
        mb={1}
      >
        <Heading size="xs" color="blackAlpha.600">
          {hospital.length > 25 ? `${hospital.substring(0, 25)} ...` : hospital}
        </Heading>
        <Heading size="xs" color="blackAlpha.600">
          {moment(date).format("MMMM DD, YYYY")}
        </Heading>
      </Box>
      <Box
        w="23rem"
        h="10rem"
        boxShadow="md"
        rounded={15}
        bg="white"
        pt={3}
        pr={3}
        pb={4}
        _hover={{
          transform: "scale(1.05,1.05)",
          transition: "transform 0.15s ease-out",
        }}
      >
        <Flex
          h="80%"
          justifyContent="space-between"
          pl={5}
          onClick={(e) => callBack(e, id)}
        >
          <Box>
            <Heading size="md" color="blackAlpha.700" mb={2}>
              {name}
            </Heading>
            <Flex
              w="inherit"
              justifyContent="start"
              alignItems="center"
              columnGap={5}
              mb={2}
            >
              <Element title="bod" value={`${age}yrs`} />
              <Element title={sex} value={sex} />
            </Flex>
            <Flex columnGap={2} alignContent="center">
              <FaBriefcaseMedical color="teal" />
              <Text fontSize={14} fontWeight={600} color="blackAlpha.700">
                {caseNo}
              </Text>
            </Flex>
          </Box>
          <Avatar src={sex === "Male" ? male : female} name={name} size="md" />
        </Flex>
        <Flex justifyContent="space-between" pr={1}>
          <Flex>
            {component.map((value, index) => (
              <ButtonComponent key={index} {...value} />
            ))}
          </Flex>
          <Box mt={2}>
            <Element title="status" value={status} />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

CardComponent.propTypes = {
  id: PropTypes.string,
  hospital: PropTypes.string,
  date: PropTypes.object,
  name: PropTypes.string,
  age: PropTypes.number,
  sex: PropTypes.string,
  caseNo: PropTypes.string,
  status: PropTypes.string,
  style: PropTypes.object,
};

export default CardComponent;
