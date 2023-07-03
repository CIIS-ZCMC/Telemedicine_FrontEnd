import { Button } from "@chakra-ui/react";
import PropTypes from "prop-types";

const ButtonComponent = ({
  icon,
  text,
  variant = "solid",
  borderRadius,
  bgColor,
  color = "white",
  fontSize = "14px",
  paddingX,
  action,
  paddingY = "0px",
}) => {
  return (
    <Button
      rightIcon={icon}
      bgColor={bgColor}
      color={color}
      variant={variant}
      borderRadius={borderRadius}
      sx={{
        fontWeight: 300,
        fontSize: fontSize,
        paddingX: paddingX,
        paddingY: paddingY,
      }}
      _hover={{
        backgroundColor: "teal",
        paddingX: paddingX + 2,
        transition: ".4s ease",
      }}
      onClick={action}
    >
      {text}
    </Button>
  );
};

ButtonComponent.propTypes = {
  icon: PropTypes.object,
  text: PropTypes.string,
  variant: PropTypes.string,
  bgColor: PropTypes.string,
  borderRadius: PropTypes.integer,
  color: PropTypes.string,
  fontSize: PropTypes.float,
  paddingX: PropTypes.float,
  paddingY: PropTypes.float,
};

export default ButtonComponent;
