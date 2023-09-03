import { Button, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

const HospitalButton = ({ name, icon, color, selected, setSelected }) => {
  return (
    <Button
      size="xs"
      fontSize={11}
      color={color}
      p="1rem"
      _hover={{
        w: "8rem",
        bg: color,
        color: "white",
        transition: "0.3s",
        boxShadow: "md",
        "#bt-name, #bt-icon": { color: "white", transition: "0.3s" },
      }}
      gap={1.5}
      rounded={10}
      onMouseEnter={() => {
        setSelected(name);
      }}
    >
      {icon}
      {selected === name ? (
        <Text id="bt-name" color="blackAlpha.800">
          {name}
        </Text>
      ) : null}
    </Button>
  );
};

HospitalButton.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.object,
  color: PropTypes.object,
  selected: PropTypes.string,
  setSelected: PropTypes.func,
};

export default HospitalButton;
