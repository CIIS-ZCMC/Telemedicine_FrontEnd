import { Button } from "@chakra-ui/react";
import React from "react";

const ButtonComponent = ({
  icon,
  text,

  variant = "solid",
  borderRadius,
  bgColor,
  color = "white",
  styles,
  fontSize = "14px",
  paddingX,
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
    >
      {text}
    </Button>
  );
};

export default ButtonComponent;
