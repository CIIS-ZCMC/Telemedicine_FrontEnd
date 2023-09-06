import { Box, Flex, Heading, Image, WrapItem, Text } from "@chakra-ui/react";
import { BsFillBriefcaseFill, BsPersonCircle } from "react-icons/bs";
import useThemeHook from "../../Hooks/useThemeHook";
import hospitalImage from "../../assets/zcmc-bg1.png";
import { AiTwotoneEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import PropTypes from "prop-types";
import HospitalButton from "./HospitalButton";
import { useState } from "react";

const IconComponent = ({ icon, label, value }) => {
  const { fontColor } = useThemeHook();

  return (
    <Flex gap={1} color="teal">
      {icon}
      <Heading pl={2} m="auto" size="sm" color={fontColor}>
        {value}
      </Heading>
      <Text fontSize={12} color={fontColor}>{`${label}${
        value > 1 ? "s" : ""
      }`}</Text>
    </Flex>
  );
};

IconComponent.propTypes = {
  icon: PropTypes.object,
  label: PropTypes.string,
  value: PropTypes.string,
};

const HospitalCard = ({
  id,
  name,
  street,
  barangay,
  city,
  url,
  doctor,
  patient,
  onUpdate,
  onDelete,
}) => {
  const [selected, setSelected] = useState("Details");

  const buttons = [
    {
      name: "Details",
      icon: <TbListDetails id="bt-icon" size={20} />,
      color: "teal",
      onClick: () => console.log("click me"),
    },
    {
      name: "Update",
      icon: <AiTwotoneEdit id="bt-icon" size={20} />,
      color: "darkorange",
      onClick: () => onUpdate(id, name, street, barangay, city),
    },
    {
      name: "Delete",
      icon: <MdDelete id="bt-icon" size={20} />,
      color: "red",
      onClick: () => onDelete(id),
    },
  ];

  return (
    <WrapItem>
      <Box
        w="18rem"
        h="22rem"
        rounded={10}
        bg="white"
        boxShadow="lg"
        overflow="hidden"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        cursor="pointer"
      >
        <Box h="100%" overflow="hidden">
          <Image src={url === null ? hospitalImage : url} fit="cover" />
        </Box>
        <Box
          h="100%"
          pl={3}
          pt={3}
          pb={2}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box h="5rem">
            <Box h={"5.5rem"}>
              <Heading size="xs" mb={2}>
                {name.toLocaleUpperCase()}
              </Heading>
              <Text fontSize={12} mb={5}>
                {`${street}, ${barangay}, ${city}`}
              </Text>
            </Box>
            <Flex
              p={0}
              pl={2}
              pr={2}
              w="100%"
              justifyContent="space-around"
              alignItems="center"
            >
              <IconComponent
                icon={<BsFillBriefcaseFill size={20} />}
                label="Patient"
                value={patient}
              />
              <IconComponent
                icon={<BsPersonCircle size={20} />}
                label="Doctor"
                value={doctor}
              />
            </Flex>
          </Box>

          <Flex justifyContent="end" gap={5} pt={3} pr={3} mt={2}>
            {buttons.map((button, index) => (
              <HospitalButton
                key={index}
                {...button}
                selected={selected}
                setSelected={setSelected}
              />
            ))}
          </Flex>
        </Box>
      </Box>
    </WrapItem>
  );
};

HospitalCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  street: PropTypes.string,
  barangay: PropTypes.string,
  city: PropTypes.string,
  url: PropTypes.string,
  doctor: PropTypes.number,
  patient: PropTypes.number,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
};

export default HospitalCard;
